const cache: Map<string, number[]> = new Map<string, number[]>();

export default async function getBaseDimensions(src: string): Promise<number[]>{
    
    if(cache.has(src)) return cache.get(src)!;
    
    const image = new Image();
    image.src = src;
    
    return new Promise((resolve)=>{
        image.onload = () => {
            const dims = [image.width, image.height];
            cache.set(src, dims);
            resolve(dims);
        }
    })
}