export class FormModel {
     public passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$';
     public validNumberRegex = '^[0-9]+(.[0-9]+)?$';
     public validStringRegex = '^[a-zA-Z0-9,+*& \\_\\-.\\(\\)\\[\\]/%]+$';

     public numberValidationMessage = 'Enter a valid number. It can be an integer or a decimal (e.g., 123 or 123.45).';
     public stringValidationMessage = 'Please enter a valid string using letters, numbers, and these symbols: , + * & _ - . ( ) [ ] / %. Spaces are also allowed.';
     public passwordValidationMsg = 'Password must be 8-20 characters with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (e.g., @, #, $).';
     public webUrlValidationMsg = 'Please enter valid URL.';

     public formErrors: any = {
          eventForm: {
               title: '',
               date: '',
               location: '',
               description: '',
               hashtag: '',
               image: '',
               product: '',
               scope: '',
               category: '',
               popularity: '',
               status: ''
          }
     };

     public validationMessage: any = {
          eventForm: {
               title: {
                    required: 'Title is required.'
               },
               date: {
                    required: 'Date is required.'
               },
               location: {
                    required: 'Location is required.'
               },
               description: {
                    required: 'Description is required.'
               },
               hashtag: {
                    required: 'Hastag is required.'
               },
               image: {
                    required: 'Image is required.'
               },
               product: {
                    required: 'Product is required.'
               },
               scope: {
                    required: 'Scope is required.'
               },
               category: {
                    required: 'Category is required.'
               },
               popularity: {
                    required: 'Popularity is required.'
               },
               status: {
                    required: 'Status is required.'
               }
          }
     };
}
