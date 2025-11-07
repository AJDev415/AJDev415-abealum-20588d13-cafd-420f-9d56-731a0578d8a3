# Smts0

Project Summary/Notes

● This was my first time using any of the technologies in this particular stack, save tailwind and typescript.
It was essentially a solo 8 hour boot camp with nx-nest-angular-postgres-typeORM (and it was awesome!). As opposed
to producing a polished product, my goal is to show that I understand the fundamental principles associated
with building a project like this and can learn quickly enough to demonstrate those skills in an unfamiliar stack
in 8 hours.

● To my continued bewilderment, tailwind seemed to just randomly stop working in the middle
of the build, as I'll certainly explain in more detail in the video. *Update, I just finally figured
out the issue while making this readme, will explain in the video*

● Because of the tailwind issue (and time taken to attempt to fix it), I was unable to get anything
other than a bare bones UI completed, and that's the reason for the global/inline css everywhere.

● Eager to begin the project, I quickly reviewed the instructional pdf on my desktop, where the content on the 
fit to where it looked like the pdf was only one page. So roughly the first half of the project was built
with only the first page of the instructions for context. I tried my best to match the template as best
I could with the remaining time alotted once I discovered my error.


Setup Instructions

    ● How to run both backend and frontend apps
        Restore the included .sql file into postgres
        Configure .env for nest.js
        npm i (first time)
        nx serve frontend (both nx and tailwind may need to be installed globally!!)
        Users - passwords:
            john - changeme
            maria - guess
            alice - alice
            bob - bob
            new - new
            charlie - charlie

    ● .env setup (JWT secrets, DB config)
        In the root of apps/backend, add the following .env:
            DB_USERNAME=[Your Database Username]
            DB_PASSWORD=[Your Database Password]
            DB_TYPE=postgres
            DB_PORT=[Your Database Port]
            DB_HOST=[Your Database Host]
            DB_NAME=[Your Database Name]
            JWT_SECRET=[Your JWT Secret]

Architecture Overview

    ● NX monorepo layout and rationale
        As a novice to the stack, much of the layout and rationale behind it was from the init boilerplate generated,
        the docs of each respective framework, or from the project instructions. I'm still going back and forth with myself
        as to the best way to structure everything, and would look to others more familiar for guidance rather than reinvent
        the wheel.
    ● Explanation of shared libraries/modules
        Most modules are self-contained, largely due simply to time constraints. Given more time, libs/auth and libs/data would 
        be far more populated. I certainly would have made the dashbooard components more modular.

Data Model Explanation

    ● Describe schema and include ERD/diagram

    Very simple - a users table and a tasks table, with the tasks table linked to users by the foreign key of 
    employee_id.

![ERD](apps/frontend/public/ERD.png)
    
    Access Control Implementation

        ● How roles, permissions, and organization hierarchy work

            Every user is assigned a role and an organization. Only managers and admins are able to add new users and create/delete tasks. On the dashboard, the only tasks that are viewable are the tasks for your organization. Users can only see organizational tasks.

        ● How JWT auth integrates with access control
            Upon successful login, a user has the JWT stored in their local storage. Any subsequent requests have the JWT
            automatically inserted from the auth interceptor if the JWT is in storage.

    API Docs

        ● Endpoint list with sample requests/responses

            All API endpoints return void promises unless otherwise indicated. The only two I didn't get the time to implement were PUT to update tasks, and the GET for the logs, both of which would have been very similar to these requests (and logs 
            are still made to the server console where appropriate).

            /auth

            this.http.post<{ access_token: string; role: string; organization: string }>(
                `http://localhost:3000//login`,{ username, password }
                )
                API returns: Promise: <{
                    access_token: await this.jwtService.signAsync(payload),
                    role: user.role,
                    organization: user.org,
                }>

            /tasks

                getTasks(org: string){
                    return this.http.get('http://localhost:3000/tasks', { params: { organization: org } });
                }
                API returns: Promise<Task[]>

                createTask(id: string, description: string, org: string) {
                    return this.http.post('http://localhost:3000/tasks', { employeeId: id, description, organization: org });
                }

                deleteTask(id: number, role: string) {
                    if (role === 'admin' || role === 'manager') {
                        return this.http.delete<void>(`http://localhost:3000/tasks/${id}`);
                    }
                    throw new Error('Unauthorized: Only admin or manager can delete tasks');
                }   

            /users

              addUser(user: { username: string; password: string; role: string; org: string }): Observable<Object> {
                return this.http.post(`http://localhost:3000/addUser`, user);
            }
            API returns: Promise<User>

    Future Considerations

        ● Advanced role delegation
            Absolutely. Many more roles, specific tasks based on roles, task status etc.

        ● Production-ready security: JWT refresh tokens, CSRF protection, RBAC caching
            This would certainly be a future consideration. Refreshing the JWT and RBAC caching would be straightforward I would imagine. CSRF protections would be added if auth were using cookie sessions.

        ● Scaling permission checks efficiently
            As I mentioned, there would certainly be one file, likely in libs/auth where all of the logic for
            inevitable RBAC scaling would exist.