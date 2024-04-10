

export const APP_URL = 'https://cf65-118-69-187-254.ngrok-free.app/todos';


// const getListTodo = async () => {
//     const res = await fetch(APP_URL)
//     const listTodo = await res.json();
//     return listTodo;
// }

const getListTodo = async () => {
    const res = await fetch(APP_URL)
        .then(res => res.json())
        .then(res => res)

    return res;
}

const apiAddNewTodo = async (todo) => {
    try {
        const res = await fetch(APP_URL, {
            method: 'POST',
            body: JSON.stringify(todo)
        })
        const data = await res.json();
        return data
    } catch (error) {
        console.log("Lỗi thêm todo", error);
    }
}

const apiUpdateTodo = async (item) => {
    try {
        const res = await fetch(`${APP_URL}/${item.id}`, {
            method: 'PUT',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify(item)
        })
        const data = await res.json();
        // console.log("data: ", data);
        return data;

    } catch (error) {

    }
}


export { getListTodo, apiUpdateTodo, apiAddNewTodo }

