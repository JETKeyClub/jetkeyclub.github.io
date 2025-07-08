interface resource<T> {
    read : () => T
}
//This is for Suspense Image. I wouldn't mess with this unless you really know what you are doing.

function CreateResource<T>(promise: Promise<T>): resource<T> {
    let status: "pending" | "success" | "failed" = "pending";
    let result : T;
    let error: any;

    const suspender = promise.then(
        
        (res) => {
            status = "success";
            result = res;
        },
        (err) => {
            status = "failed";
            error = err;
        
        }
    )
    return { read(): T{

        if(status==="pending")
            throw suspender;
        else if(status === "failed")
            throw error;
        
        return result;

    }   
}
}


export { CreateResource };
export type { resource };
