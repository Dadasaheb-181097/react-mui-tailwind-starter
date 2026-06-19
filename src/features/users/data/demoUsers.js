const FIRST_NAMES = [
  'Jane', 'John', 'Alex', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa',
  'Robert', 'Maria', 'James', 'Anna', 'Chris', 'Nina', 'Tom', 'Kate',
]
const LAST_NAMES = [
  'Smith', 'Doe', 'Kumar', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Lee',
  'Fox', 'Garcia', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'White',
]
const ROLES = ['User', 'Manager', 'Admin']
const LAST_ACTIVE = ['Just now', '30 min ago', '1 hour ago', '3 hours ago', 'Yesterday', '2 days ago', 'Never']
const JOINED = ['Dec 5, 2023', 'Jan 12, 2023', 'Mar 8, 2024', 'Jun 15, 2023', 'Aug 22, 2024', 'Nov 3, 2022']

function pick(list, index) {
  return list[index % list.length]
}

function buildUser(id, status, roleIndex) {
  const first = pick(FIRST_NAMES, id)
  const last = pick(LAST_NAMES, id * 3)
  const name = `${first} ${last}`
  const role = ROLES[roleIndex % ROLES.length]
  const slug = `${first}.${last}`.toLowerCase().replace(/\s/g, '')

  return {
    id: String(id),
    name,
    email: `${slug}${id}@example.com`,
    role,
    status,
    initials: `${first[0]}${last[0]}`.toUpperCase(),
    lastActive: status === 'Inactive' ? 'Never' : pick(LAST_ACTIVE, id),
    joined: pick(JOINED, id),
    online: status === 'Active' && id % 4 !== 0,
  }
}

/** Demo users — 248 rows with reference-like status distribution */
export function createDemoUsers() {
  const users = []
  let id = 1

  const pushMany = (status, count, roleOffset = 0) => {
    for (let i = 0; i < count; i += 1) {
      users.push(buildUser(id, status, id + roleOffset))
      id += 1
    }
  }

  pushMany('Active', 186, 0)
  pushMany('Pending', 24, 1)
  pushMany('Inactive', 38, 2)

  return users
}

export const DEMO_USERS = createDemoUsers()
