import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
     imports: [RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  userName = localStorage.getItem('userName') || 'Admin';

stats = [
    { title: 'Total Students', value: '248', icon: '🎓', color: 'blue' },
    { title: 'Total Teachers', value: '18', icon: '👨‍🏫', color: 'green' },
    { title: 'Total Users', value: '12', icon: '👥', color: 'orange' },
    { title: 'Active Roles', value: '3', icon: '🛡️', color: 'purple' }
  ];
  recentStudents = [
    { id: 'STU001', name: 'Rahul Sharma', className: '10th', status: 'Active' },
    { id: 'STU002', name: 'Priya Verma', className: '9th', status: 'Active' },
    { id: 'STU003', name: 'Aman Kumar', className: '12th', status: 'Pending' },
    { id: 'STU004', name: 'Neha Singh', className: '8th', status: 'Active' }
  ];
}
