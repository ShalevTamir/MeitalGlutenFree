export class LazyValue<TValue>{
    private _valuePromise: Promise<TValue>;
    private _resolvePromiseCallback: ((value: TValue) => void) | undefined;
    private _value: TValue | undefined;

    constructor(){
        this._valuePromise = new Promise((resolveMethod) => {
            this._resolvePromiseCallback = resolveMethod;
        })
    }

    public SetValue(value: TValue){
        //In this case, the promise hasn't been awaited yet, store the value for later
        if (this._resolvePromiseCallback === undefined)
            this._value = value
        else
            this._resolvePromiseCallback(value);
    }

    public async GetValue(): Promise<TValue>{
        if (this._value !== undefined)
            return this._value;
        else
            return await this._valuePromise;
    }


}

