<template>
  <div class="page">
    <h1>User List</h1>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>
            <a href="#" @click="editUser(user.id)">Edit</a> |
            <a href="#" @click="deleteUser(user.id)">Delete</a> |
            <a href="#" @click="viewUser(user.id)">View</a>
          </td>
        </tr>
      </tbody>
    </table>

    <a class="new-user-btn" href="#" @click="newUser">Add User</a>
  </div>
</template>

<script>
import UserService from "@/service/userService";

export default {
  name: "UserList",
  data() {
    return {
      users: [],
    };
  },
  async created() {
    this.users = await UserService.getUsers();
  },
  methods: {
    async viewUser(id) {
      // Show all information in a Swal dialog
      const user = this.users.find((user) => user.id === id);
      this.$swal({
        title: "User Information",
        html: `
          <strong>First Name:</strong> ${user.firstName}<br>
          <strong>Last Name:</strong> ${user.lastName}<br>
          <strong>
          Items: ${user.items.map((item) => item.name).join(", ")}  
          </strong>
        `,
      });
    },

    async editUser(id) {
      // Edit in a Swal dialog.
      const user = this.users.find((user) => user.id === id);
      const { value: formValues } = await this.$swal({
        title: "Edit User",
        html: `
          <input id="swal-input1" class="swal2-input" value="${user.firstName}">
          <input id="swal-input2" class="swal2-input" value="${user.lastName}">
          <input id="swal-input3" class="swal2-input" value="${user.items
            .map((item) => item.name)
            .join(", ")}">
        `,
        focusConfirm: false,
        preConfirm: () => [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document
            .getElementById("swal-input3")
            .value.split(",")
            .map((item) => item.trim()),
        ],
      });

      if (!formValues) return;

      const newUser = {
        ...user,
        firstName: formValues[0],
        lastName: formValues[1],
        items: formValues[2].map((name) => ({ name })),
      };

      await UserService.updateUser(id, newUser);
      this.users = await UserService.getUsers();
    },

    async deleteUser(id) {
      // Delete in a Swal dialog.
      const user = this.users.find((user) => user.id === id);
      const result = await this.$swal({
        title: "Are you sure?",
        text: `You will not be able to recover ${user.firstName} ${user.lastName}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });

      if (!result.value || !result.isConfirmed) return;

      await UserService.deleteUser(id);
      this.users = await UserService.getUsers();
    },

    async newUser() {
      // Add in a Swal dialog.
      const { value: formValues } = await this.$swal({
        title: "Add User",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="First Name">
          <input id="swal-input2" class="swal2-input" placeholder="Last Name">
          <input id="swal-input3" class="swal2-input" placeholder="Items (comma-separated)">
        `,
        focusConfirm: false,
        preConfirm: () => [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document
            .getElementById("swal-input3")
            .value.split(",")
            .map((item) => item.trim()),
        ],
      });

      if (!formValues) return;

      const newUser = {
        firstName: formValues[0],
        lastName: formValues[1],
        items: formValues[2].map((name) => ({ name })),
      };

      await UserService.createUser(newUser);
      this.users = await UserService.getUsers();
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  max-width: 800px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f2f2f2;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.new-user-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.new-user-btn:hover {
  background-color: #0056b3;
}
</style>
