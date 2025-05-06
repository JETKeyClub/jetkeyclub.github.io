interface resource<T> {
    read : () => T
}

function CreateResource<T>(promise: Promise<T>): resource<T> {
    let status: string = "pending";
    let result : any;

    const suspender = promise.then((res) => {
            status = "success";
            result = res;
        },
        (err) => {
            status = "failed";
            result = err;
        }
    )
    return { read(): T{
        if(status=="pending")
            throw suspender;
        else if(status == "failed")
            throw result;
        
        return result;

    }   
}
}


export { CreateResource };
export type { resource };
