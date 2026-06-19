export const CHAT_CONTACTS = [
  {
    id: '1',
    name: 'Alene Tortiss',
    role: 'Business Analyst',
    time: '11:30 AM',
    unread: true,
    online: true,
    initials: 'AT',
  },
  {
    id: '2',
    name: 'Keefe',
    role: 'Project Manager',
    time: '11:30 AM',
    unread: false,
    online: true,
    initials: 'KE',
  },
  {
    id: '3',
    name: 'Lazaro',
    role: 'Developer',
    time: 'Yesterday',
    unread: false,
    online: false,
    initials: 'LA',
  },
  {
    id: '4',
    name: 'Liana',
    role: 'Designer',
    time: 'Yesterday',
    unread: false,
    online: true,
    initials: 'LI',
  },
  {
    id: '5',
    name: 'Kenzi',
    role: 'Sales Executive',
    time: '2 Jun',
    unread: false,
    online: false,
    initials: 'KN',
  },
  {
    id: '6',
    name: 'Maya',
    role: 'Accountant',
    time: '2 Jun',
    unread: true,
    online: true,
    initials: 'MY',
  },
  {
    id: '7',
    name: 'Nikko',
    role: 'Business Development',
    time: '2 Jun',
    unread: false,
    online: false,
    initials: 'NI',
  },
  {
    id: '8',
    name: 'Robert Fox',
    role: 'Marketing Lead',
    time: '1 Jun',
    unread: false,
    online: true,
    initials: 'RF',
  },
  {
    id: '9',
    name: 'Emily',
    role: 'Support Engineer',
    time: '31 May',
    unread: false,
    online: false,
    initials: 'EM',
  },
]

export const CHAT_MESSAGES = {
  '1': [
    { id: 'm1', from: 'them', text: 'Can you share the invoice summary?', time: '11:28 AM' },
    { id: 'm2', from: 'me', text: 'Sure, sending it in a minute.', time: '11:30 AM' },
  ],
  '2': [
    { id: 'm1', from: 'them', text: 'Hi Good Morning!', time: '12:05 PM' },
    {
      id: 'm2',
      from: 'me',
      text: 'Good Morning! Deepo, Did you sleep well?',
      time: '12:05 PM',
    },
    {
      id: 'm3',
      from: 'me',
      text: 'I need some UI kits, with decent ideas. I have a project with a deadline coming up. Do you have any ready-made UI kits along with the figma files?',
      time: '12:11 PM',
    },
    {
      id: 'm4',
      from: 'them',
      text: 'Thank you very much! I am facing problem with my checkout!',
      time: '12:15 PM',
    },
    { id: 'm5', from: 'me', text: "OMG. What's the problem?", time: '12:15 PM' },
    {
      id: 'm6',
      from: 'them',
      text: 'I am trying to purchase a product from your website. But the checkout page is not working. It is giving me an error message.',
      time: '12:16 PM',
    },
    {
      id: 'm7',
      from: 'me',
      text: 'Can you please provide me with the error message screenshot? I will try to fix it as soon as possible.',
      time: '12:17 PM',
    },
    { id: 'm8', from: 'them', text: "Ohh Thank you. Now it's Working", time: '12:20 PM' },
    { id: 'm9', from: 'me', text: 'Great! Feel free to get in touch.', time: '12:21 PM' },
  ],
  '3': [
    { id: 'm1', from: 'them', text: 'Can we sync on the rollout plan?', time: 'Yesterday' },
    { id: 'm2', from: 'me', text: 'Yes, tomorrow 3 PM works for me.', time: 'Yesterday' },
  ],
}

export function getMessagesForContact(contactId) {
  return CHAT_MESSAGES[contactId] || [
    { id: 'default', from: 'them', text: 'Hey! How can I help you today?', time: 'Just now' },
  ]
}
