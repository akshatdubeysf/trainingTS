export const formatDate = () => {
    return  (target: any, key: string | symbol) => {

        let val = target[key];

        const getter = () => {
            return val;
        };
        const setter = (next: any) => {
            try{
                next = new Date(next).toLocaleDateString();
            }
            catch(e){
                next = 'Invalid Date';
            }
            val = next;
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true
        });

    };
}