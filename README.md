# Angular E-Commerce Project

This project is a hands-on implementation of concepts learned during the ITI Angular Course. It is an e-commerce platform where users can browse products, add items to their favorites and cart, register, and log in.

## About the Project

This project serves as a practical application of various Angular concepts covered in the course. It demonstrates key features such as:

- Data Binding
- Directives (including `ng-template`, `ng-container`) & Custom Directives
- Pipes & Custom Pipes
- Component Lifecycle Hooks
- Component Interaction (`@Input`, `@Output`, `@ViewChild`)
- Services
- Routing
- Observables
- Route Guards
- JSON Server Integration & `HttpClient`
- Template-driven & Reactive Forms
- Lazy Loading Modules

## Technologies Used

- **Angular**: A platform for building client-side applications.
- **Bootstrap**: For responsive and mobile-first front-end design.
- **Angular Material**: A UI component library for Angular.

## Installation
To get a local copy up and running, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Menna-2003/Angular.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Angular
   ```
3. Each Folder run with diffrent node version so first you need to have node 14 and 18

    - Navigate to the project directory:
       ```bash
       cd API
       ```
    - Use node 18:
       ```bash
       nvm use 18
       ```
    - Install dependencies:
       ```bash
       npm install
       ```

   then do the same to iti_tutorial
    
    - Navigate to the project directory:
      ```bash
      cd iti_tutorial
      ```
    - Use node 18:
      ```bash
      nvm use 14
      ```
    - Install dependencies:
      ```bash
      npm install
      ```

4. Start the project:

  to run API: 
  ```bash
    npm run start:json-server
  ```

  to run iti_tutorial
  ```bash
    ng serve
  ```

## Usage
After installation, open your browser and navigate to `http://localhost:4200` to view the project.








