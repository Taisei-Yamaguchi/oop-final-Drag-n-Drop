export function autobind(
    _target: any,
    _methodName: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}
