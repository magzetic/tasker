import { createClient } from '@supabase/supabase-js';

// Hard-coded Supabase URL and Key
const SUPABASE_URL = 'https://qnefthbdtiwgwjjxxeey.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZWZ0aGJkdGl3Z3dqanh4ZWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNjg0NzUsImV4cCI6MjA0NDg0NDQ3NX0.uZS02X8G7GAkoGuvmYVmhEuQY9VrFwmqXwLRbdeboHQ';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to add a new contact
async function addContact(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const mobileNumber = document.getElementById('mobile-number').value;
  const task = document.getElementById('task').value;
  const amount = document.getElementById('amount').value;
  const deadline = document.getElementById('deadline').value;
  const remark1 = document.getElementById('remark1').value;
  const remark2 = document.getElementById('remark2').value;
  const remark3 = document.getElementById('remark3').value;
  const village = document.getElementById('village').value;

  const contact = {
    name,
    mobile_number: mobileNumber,
    task,
    amount,
    deadline_date: deadline,
    remark1,
    remark2,
    remark3,
    village,
  };

  const { data, error } = await supabase.from('contacts').insert([contact]);

  if (error) {
    console.error('Error adding contact:', error);
    alert('Error adding contact: ' + error.message);
  } else {
    console.log('Contact added:', data);
    alert('Contact added successfully!');
    document.getElementById('contact-form').reset(); // Reset form after submission
    displayContacts(); // Refresh the contact list
  }
}

// Function to fetch all contacts
async function fetchContacts() {
  const { data, error } = await supabase.from('contacts').select('*');

  if (error) {
    console.error('Error fetching contacts:', error);
    return [];
  } else {
    return data;
  }
}

// Function to display contacts in the table
async function displayContacts() {
  const contacts = await fetchContacts();
  const contactsTable = document.getElementById('contacts-table-body');
  contactsTable.innerHTML = ''; // Clear the table before displaying new data

  contacts.forEach((contact) => {
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${contact.name || ''}</td>
            <td>${contact.mobile_number || ''}</td>
            <td>${contact.task || ''}</td>
            <td>${contact.amount || ''}</td>
            <td>${contact.deadline_date || ''}</td>
            <td>${contact.remark1 || ''}</td>
            <td>${contact.remark2 || ''}</td>
            <td>${contact.remark3 || ''}</td>
            <td>${contact.village || ''}</td>
        `;
    contactsTable.appendChild(row);
  });
}

// Event listener for form submission
window.onload = async () => {
  document
    .getElementById('contact-form')
    .addEventListener('submit', addContact);
  await displayContacts(); // Load contacts when the page loads
};
