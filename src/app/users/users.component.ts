import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'; 
import { CommonService } from '../common.service';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: any;
  users: any;
  activeTab: string = 'list'; // New property to track active tab

  constructor(public fb: FormBuilder, private service: CommonService) {
    this.userForm = this.fb.group({
      // id: [null], // Include the 'id' field here
      assignedTo: [""],
      status: [""],
      dueDate: [""],
      priority: [""],
      description: [""]
    });
  }
  

  ngOnInit(): void {
    this.GetAllUser();
  }

  // Add or Update User
  SubmitForm() {
    console.log(this.userForm.value);
    
    // Determine whether to add or update based on the presence of 'id'
    const type = this.userForm.value.id ? 'update' : 'add';
    
    this.service.AddupdateUser(this.userForm.value, type).subscribe(data => {
      if (type === 'add') {
        alert("User added");
      } else {
        alert("User updated");
      }
  
      this.userForm.reset(); // Reset the form after adding/updating
      this.GetAllUser();     // Reload the user list
    });
  }
  
  // Fetch all users
  GetAllUser() {
    this.service.GetAllUser().subscribe(data => {
      this.users = data;
    });
  }

  // Delete user by ID
  DeleteUserById(ID: any) {
    this.service.DeleteUserById(ID).subscribe(() => {
      alert("User deleted");
      this.GetAllUser(); // Reload the user list after deletion
    });
  }
  

  // Get user by ID and populate form for editing
  GetUserById(ID: any) {
    this.service.GetUserById(ID).subscribe(data => {
      console.log("user detail", data);
      this.userForm.patchValue({
        id: data.id, // Ensure the 'id' is patched here
        assignedTo: data.assignedTo,
        status: data.status,
        dueDate: data.dueDate,
        priority: data.priority,
        description: data.description
      });
  
      // Switch to the "Add Task" tab for editing
      this.setActiveTab('addTask');
    });
  }
  
  

  // Switch tabs (if needed)
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
