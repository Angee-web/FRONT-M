


//this is our form control configuration file
export const registerFormControls = [
    {
      name: "userName",
  
      placeholder: "Enter your username",
      componentType: "input",
      type: "text",
      // options : []
    },
    {
      name: "email",
  
      placeholder: "Enter your email",
      componentType: "input",
      type: "text",
    },
  
    {
      name: "password",
  
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
    // {
    //     name: "confirmPassword",
    //     label: "Confirm Password",
    //     placeholder: "Confirm your password",
    //     componentType: "input",
    //     type: "password",
    // },
  ];
  export const loginFormControls = [
    {
      name: "email",
  
      placeholder: "Enter your email",
      componentType: "input",
      type: "text",
    },
  
    {
      name: "password",
  
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
    // {
    //     name: "confirmPassword",
    //     label: "Confirm Password",
    //     placeholder: "Confirm your password",
    //     componentType: "input",
    //     type: "password",
    // },
  ];
  
  //The form control configuration for the add product form
  export const addProductFormElements = [
    {
      id: "product-name",
      name: "name",
      label: "Product Name",
      placeholder: "Enter product name",
      componentType: "input",
      type: "text",
    },
    {
      id: "product-price",
      name: "price",
      label: "Product Price",
      placeholder: "Enter product price",
      componentType: "input",
      type: "number",
    },
    {
      id: "product-description",
      name: "description",
      label: "Product Description",
      placeholder: "Enter product description",
      componentType: "textarea",
    },

    {
      id: "product-stock",
      name: "stock",
      label: "Stock Quantity",
      placeholder: "Enter stock quantity",
      componentType: "input",
      type: "number",
    },
    {
      id: "product-type",
      name: "types",
      label: "Product type",
      placeholder: "Enter the Product type",
      componentType: "input",
      type: "string",
    },
    {
      id: "category",
      name: "category",
      label: "Category",
      componentType: "select",
      options: [
        { id: "type-man", value: "men", label: "Men" },
        { id: "type-woman", value: "women", label: "Women" },
        { id: "type-couples", value: "couples", label: "Couples" },
      ],
    },
    {
      id: "product-sales",
      name: "sales",
      label: "Sales (Optional)",
      placeholder: "Enter sales quantity (optional)",
      componentType: "input",
      type: "number",
    },
  ];
  

  //
  export const sortOptions = [
    {id: "price-low-high",  label: "Price: Low - High"},
    {id: "price-high-low",  label: "Price:  High - Low"},
    {id: "title-a-z",  label: "Price:  A - Z"},
    {id: "title-z-a",  label: "Price:  Z - A"},
  ]
  


  //The form control configuration for address form

  export const addressFormControls = [
    {
      id: "address", 
      name: "address",
      label: "Address",
      placeholder: "Enter your address",
      componentType: "input",
      type: "text",
    },
    {
      id: "fullName",
      name: "fullName",
      label: "FullName",
      placeholder: "Enter your name",
      componentType: "input",
      type: "text",
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "text",
    },
    {
      id: "city",
      name: "city",
      label: "City",
      placeholder: "Enter your city",
      componentType: "input",
      type: "text",
    },
    {
      id: "phoneNumber",
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      componentType: "input",
      type: "text",
    },
    {
      id: "additionalNumber",
      name: "additionalNumber",
      label: "Additional Number",
      placeholder: "Enter an additional number",
      componentType: "input",
      type: "text",
    },
    {
      id: "notesInformation",
      name: "notesInformation",
      label: "Notes Information",
      placeholder: "Enter any additional notes",
      componentType: "textarea",
    },
    {
      id: "region",
      name: "region",
      label: "Region",
      componentType: "select",
      options: [
        { id: "SelectRegion", value: "placeholder", label: "Select a region" },
        { id: "north", value: "north", label: "North" },
        { id: "south", value: "south", label: "South" },
        { id: "east", value: "east", label: "East" },
        { id: "west", value: "west", label: "West" },
      ],
    },
  ];
  
  
  
  
  