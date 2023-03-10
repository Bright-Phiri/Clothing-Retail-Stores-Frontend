<template>
  <div class="ItemsView">
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="12">
          <v-dialog max-width="715" v-model="dialog" persistent>
            <v-card>
              <v-card-title class="d-flex justify-space-between">
                Add New Employee
                <v-icon v-on:click="dialog = false">mdi-close</v-icon>
              </v-card-title>
              <v-card-text>
                <v-form ref="addEmployeeForm">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field color="#B55B68" v-model="employee.first_name" label="First Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field color="#B55B68" v-model="employee.last_name" label="Last Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field color="#B55B68" v-model="employee.user_name" label="Username"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-autocomplete label="Role" :items="job_titles" v-model="employee.job_title">
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field color="#B55B68" v-model="employee.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field color="#B55B68" v-model="employee.phone_number" label="Phone Number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="password" color="#B55B68" label="Password" v-model="employee.password">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="password" color="#B55B68" label="Password"
                        v-model="employee.password_confirmation">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex justify-end">
                <v-btn class="text-capitalize mb-3" elevation="2" outlined v-on:click="dialog = !dialog">Cancel</v-btn>
                <v-btn class="text-capitalize mb-3" elevation="2" color="#B55B68"
                  :loading="saveEmployeeLoading ? '#B55B68' : null" outlined v-on:click="saveEmployee">Save
                  Employee</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog max-width="715" v-model="editDialog" persistent>
            <v-card>
              <v-card-title class="d-flex justify-space-between">
                Edit Employee
                <v-icon v-on:click="editDialog = false">mdi-close</v-icon>
              </v-card-title>
              <v-card-text>
                <v-form ref="editEmployeeForm">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field color="#B55B68" v-model="employee.first_name" label="First Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field color="#B55B68" v-model="employee.last_name" label="Last Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field color="#B55B68" v-model="employee.user_name" label="Username"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-autocomplete label="Role" :items="job_titles" v-model="employee.job_title">
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field color="#B55B68" v-model="employee.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field color="#B55B68" v-model="employee.phone_number" label="Phone Number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="password" color="#B55B68" label="Password" v-model="employee.password">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="password" color="#B55B68" label="Password"
                        v-model="employee.password_confirmation">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex justify-end">
                <v-btn class="text-capitalize mb-3" elevation="2" outlined
                  v-on:click="editDialog = !editDialog">Cancel</v-btn>
                <v-btn class="text-capitalize mb-3" :loading="saveEmployeeLoading ? '#B55B68' : null" elevation="2"
                  outlined color="#B55B68" v-on:click="updateEmployee">Update Employee</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <div class="d-flex justify-space-between">
            <h1 class="font-weight-regular">Employees</h1>
            <v-btn color="#B55B68" depressed class="mt-2" fab x-small v-on:click="dialog = !dialog">
              <v-icon color="#fff">mdi-plus</v-icon>
            </v-btn>
          </div>
          <div class="d-flex justify-end">
            <v-btn class="ma-2 text-capitalize font-weight-regular" plain color="#B55B68">
              <v-icon left dark color="#B55B68">
                mdi-file-export-outline
              </v-icon>
              Export all
            </v-btn>
            <v-btn color="#FFCDD2" class="mt-2" fab depressed x-small v-on:click="fetchDataFromAPI">
              <v-icon color="#E57373">mdi-cached</v-icon>
            </v-btn>
            <v-text-field color="#B55B68" v-model="search" dense rounded outlined placeholder="Search" class="shrink ml-2"
              append-icon="mdi-magnify"></v-text-field>
          </div>

          <v-card>
            <v-data-table :loading="loading ? '#B55B68' : null" loading-text="Loading Items... Please wait"
              :headers="headers" :items="employees" :items-per-page="6" show-select :search="search"
              :sort-desc="[false, true]" multi-sort>
              <template v-slot:[`item.action`]="{ item }">
                <v-icon small class="mr-0" v-on:click="showEditEmployeeDialog(item.id)" color="primary">mdi-pencil
                </v-icon>
                <v-icon small class="mr-0" color="red" v-on:click="deleteEmployee(item.id)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EmployeesService from '@/services/EmployeesService';
export default {
  name: "ItemsView",
  data() {
    return {
      dialog: false,
      editDialog: false,
      loading: false,
      saveEmployeeLoading: false,
      search: '',
      employees: [],
      employee_id: null,
      job_titles: ['Cashier', 'Store Manager'],
      employee: {
        first_name: null,
        last_name: null,
        user_name: null,
        email: null,
        phone_number: null,
        job_title: null,
        password: null,
        password_confirmation: null,
      },
      errors: [],
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'First Name', value: 'first_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Username', value: 'user_name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone_number' },
        { text: 'Role', value: 'job_title' },
        { text: 'Action', value: 'action' },
      ],
    }
  },
  methods: {
    async fetchDataFromAPI() {
      this.loading = true
      try {
        const response = await EmployeesService.getData();
        this.employees = response.data
        this.loading = false
      } catch (error) {
        this.loading = false
        this.handleError(error);
      }
    },
    async saveEmployee() {
      if (!this.employee.first_name || !this.employee.last_name || !this.employee.user_name || !this.employee.email || !this.employee.phone_number || !this.employee.password || !this.employee.password_confirmation) {
        this.$swal('Error', 'Please fill in all required fields', 'error');
        return;
      }
      this.saveEmployeeLoading = true
      let employeePayload = {
        first_name: this.employee.first_name,
        last_name: this.employee.last_name,
        user_name: this.employee.user_name,
        job_title: this.employee.job_title,
        phone_number: this.employee.phone_number,
        email: this.employee.email,
        password: this.employee.password,
        password_confirmation: this.employee.password_confirmation
      };
      try {
        const response = await EmployeesService.create(employeePayload);
        if (response.status === 201) {
          this.saveEmployeeLoading = false
          this.$swal('Information', 'Employee successfully added', 'success').then(() => {
            this.dialog = false
            this.$refs.addEmployeeForm.reset()
            this.fetchDataFromAPI();
          })
        }
      }
      catch (error) {
        this.saveEmployeeLoading = false
        this.handleError(error)
      }
    },
    async updateEmployee() {
      if (!this.employee.first_name || !this.employee.last_name || !this.employee.user_name || !this.employee.email || !this.employee.phone_number || !this.employee.password || !this.employee.password_confirmation) {
        this.$swal('Error', 'Please fill in all required fields', 'error');
        return;
      }
      this.saveEmployeeLoading = true
      let employeePayload = {
        first_name: this.employee.first_name,
        last_name: this.employee.last_name,
        user_name: this.employee.user_name,
        job_title: this.employee.job_title,
        phone_number: this.employee.phone_number,
        email: this.employee.email,
        password: this.employee.password,
        password_confirmation: this.employee.password_confirmation
      };
      try {
        const response = await EmployeesService.put(employeePayload, this.employee_id);
        if (response.status === 200) {
          this.saveEmployeeLoading = false
          this.$swal('Information', 'Employee successfully updated', 'success').then(() => {
            this.editDialog = false
            this.$refs.editEmployeeForm.reset()
            this.fetchDataFromAPI();
          })
        }
      } catch (error) {
        this.saveEmployeeLoading = false
        this.handleError(error)
      }
    },
    async showEditEmployeeDialog(employee_id) {
      this.employee_id = employee_id
      try {
        const response = await EmployeesService.show(employee_id);
        this.employee = response.data
        this.editDialog = true
      } catch (error) {
        this.handleError(error)
      }
    },
    async deleteEmployee(employee_id) {
      try {
        const response = await EmployeesService.delete(employee_id);
        if (response.status === 204) {
          this.$swal('Information', 'Employee deleted successfully', 'success').then(() => {
            this.fetchDataFromAPI();
          })
        }
      } catch (error) {
        this.handleError(error)
      }
    },
  },
  mounted() {
    this.fetchDataFromAPI();
  }
};
</script>
