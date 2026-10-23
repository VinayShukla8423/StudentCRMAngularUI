import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService, User,Role, UpdateUserRequest} from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  private userService = inject(UserService);
  users: User[] = [];
  roles: Role[] = [];
  
  searchText = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  editingId: string | null = null;

  editForm: UpdateUserRequest = {
    userName: '',
    email: '',
    isActive: true
  };

  selectedRoleId = '';

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.status === 401
            ? 'Login session expired. Please login again.'
            : error.status === 403
              ? 'Only Admin can manage users.'
              : 'Unable to load users. Check API and token.';
      }
    });
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: () => {
        this.errorMessage =
          'Unable to load roles. Check GET /api/roles API.';
      }
    });
  }
get activeUsers(): number {
  return this.users.filter(user => user.isActive).length;
}

get inactiveUsers(): number {
  return this.users.filter(user => !user.isActive).length;
}
  get filteredUsers(): User[] {
    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      return this.users;
    }

    return this.users.filter(user =>
      user.userName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.roleName.toLowerCase().includes(search)
    );
  }

  startEdit(user: User): void {
    this.editingId = user.id;

    this.editForm = {
      userName: user.userName,
      email: user.email,
      isActive: user.isActive
    };

    this.selectedRoleId = user.roleId;
    this.successMessage = '';
    this.errorMessage = '';
  }

  cancelEdit(): void {
    this.editingId = null;
    this.selectedRoleId = '';
  }

  saveUser(user: User): void {
    if (!this.editForm.userName.trim() ||
        !this.editForm.email.trim()) {
      this.errorMessage = 'Username and email are required.';
      return;
    }

    this.userService.updateUser(user.id, this.editForm).subscribe({
      next: () => {
        if (this.selectedRoleId !== user.roleId) {
          this.saveRole(user.id);
        } else {
          this.finishSave('User updated successfully.');
        }
      },
      error: () => {
        this.errorMessage = 'Failed to update user.';
      }
    });
  }

  private saveRole(userId: string): void {
    this.userService.changeRole(userId, {
      roleId: this.selectedRoleId
    }).subscribe({
      next: () => {
        this.finishSave('User and role updated successfully.');
      },
      error: () => {
        this.errorMessage =
          'User details updated, but role update failed.';
        this.loadUsers();
      }
    });
  }

  private finishSave(message: string): void {
    this.successMessage = message;
    this.editingId = null;
    this.loadUsers();
  }

  deleteUser(user: User): void {
    const confirmed = confirm(
      `Are you sure you want to delete ${user.userName}?`
    );

    if (!confirmed) {
      return;
    }

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.successMessage = 'User deleted successfully.';
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'Failed to delete user.';
      }
    });
  }
}