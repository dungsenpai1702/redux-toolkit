
import { Model, createServer } from 'miragejs';

export const setupServer = () => {
    let server = createServer({
        models: {
            todos: Model
        },
        routes() {
            this.get('api/todos', (schema) => {
                return schema.todos.all();
            });

            this.post('api/todos', (schema, request) => {
                const payload = JSON.parse(request.requestBody);
                return schema.create(payload)
            })
        }
    });
    // server.get('/api/todos', {
    //     todos:
    //         [
    //             {
    //                 id: 1,
    //                 title: 'Làm tiếng anh',
    //                 completed: false,
    //             },
    //             {
    //                 id: 2,
    //                 title: 'Code ASM AND Rest API',
    //                 completed: false,
    //             },
    //             {
    //                 id: 3,
    //                 title: 'Code ASM React native',
    //                 completed: false,
    //             },
    //             {
    //                 id: 4,
    //                 title: 'Làm lab AND Rest API',
    //                 completed: false,
    //             },
    //         ]
    // })
}