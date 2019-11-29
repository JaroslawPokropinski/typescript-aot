import binaryen = require('binaryen');
export default class Type {
    type: binaryen.Type;
    constructor(type: binaryen.Type);
    getOperations(mod: binaryen.Module): {
        load(offset: number, align: number, ptr: number): number;
        load8_s(offset: number, align: number, ptr: number): number;
        load8_u(offset: number, align: number, ptr: number): number;
        load16_s(offset: number, align: number, ptr: number): number;
        load16_u(offset: number, align: number, ptr: number): number;
        store(offset: number, align: number, ptr: number, value: number): number;
        store8(offset: number, align: number, ptr: number, value: number): number;
        store16(offset: number, align: number, ptr: number, value: number): number;
        const(value: number): number;
        clz(value: number): number;
        ctz(value: number): number;
        popcnt(value: number): number;
        eqz(value: number): number;
        trunc_s: {
            f32(value: number): number;
            f64(value: number): number;
        };
        trunc_u: {
            f32(value: number): number;
            f64(value: number): number;
        };
        trunc_s_sat: {
            f32(value: number): number;
            f64(value: number): number;
        };
        trunc_u_sat: {
            f32(value: number): number;
            f64(value: number): number;
        };
        reinterpret(value: number): number;
        extend8_s(value: number): number;
        extend16_s(value: number): number;
        wrap(value: number): number;
        add(left: number, right: number): number;
        sub(left: number, right: number): number;
        mul(left: number, right: number): number;
        div_s(left: number, right: number): number;
        div_u(left: number, right: number): number;
        rem_s(left: number, right: number): number;
        rem_u(left: number, right: number): number;
        and(left: number, right: number): number;
        or(left: number, right: number): number;
        xor(left: number, right: number): number;
        shl(left: number, right: number): number;
        shr_u(left: number, right: number): number;
        shr_s(left: number, right: number): number;
        rotl(left: number, right: number): number;
        rotr(left: number, right: number): number;
        eq(left: number, right: number): number;
        ne(left: number, right: number): number;
        lt_s(left: number, right: number): number;
        lt_u(left: number, right: number): number;
        le_s(left: number, right: number): number;
        le_u(left: number, right: number): number;
        gt_s(left: number, right: number): number;
        gt_u(left: number, right: number): number;
        ge_s(left: number, right: number): number;
        ge_u(left: number, right: number): number;
        atomic: {
            load(offset: number, ptr: number): number;
            load8_u(offset: number, ptr: number): number;
            load16_u(offset: number, ptr: number): number;
            store(offset: number, ptr: number, value: number): number;
            store8(offset: number, ptr: number, value: number): number;
            store16(offset: number, ptr: number, value: number): number;
            rmw: {
                add(offset: number, ptr: number, value: number): number;
                sub(offset: number, ptr: number, value: number): number;
                and(offset: number, ptr: number, value: number): number;
                or(offset: number, ptr: number, value: number): number;
                xor(offset: number, ptr: number, value: number): number;
                xchg(offset: number, ptr: number, value: number): number;
                cmpxchg(offset: number, ptr: number, expected: number, replacement: number): number;
            };
            rmw8_u: {
                add(offset: number, ptr: number, value: number): number;
                sub(offset: number, ptr: number, value: number): number;
                and(offset: number, ptr: number, value: number): number;
                or(offset: number, ptr: number, value: number): number;
                xor(offset: number, ptr: number, value: number): number;
                xchg(offset: number, ptr: number, value: number): number;
                cmpxchg(offset: number, ptr: number, expected: number, replacement: number): number;
            };
            rmw16_u: {
                add(offset: number, ptr: number, value: number): number;
                sub(offset: number, ptr: number, value: number): number;
                and(offset: number, ptr: number, value: number): number;
                or(offset: number, ptr: number, value: number): number;
                xor(offset: number, ptr: number, value: number): number;
                xchg(offset: number, ptr: number, value: number): number;
                cmpxchg(offset: number, ptr: number, expected: number, replacement: number): number;
            };
        };
        wait(ptr: number, expected: number, timeout: number): number;
    } | {
        load(offset: number, align: number, ptr: number): number;
        store(offset: number, align: number, ptr: number, value: number): number;
        const(value: number): number;
        const_bits(value: number): number;
        neg(value: number): number;
        abs(value: number): number;
        ceil(value: number): number;
        floor(value: number): number;
        trunc(value: number): number;
        nearest(value: number): number;
        sqrt(value: number): number;
        reinterpret(value: number): number;
        convert_s: {
            i32(value: number): number;
            i64(value: number): number;
        };
        convert_u: {
            i32(value: number): number;
            i64(value: number): number;
        };
        demote(value: number): number;
        add(left: number, right: number): number;
        sub(left: number, right: number): number;
        mul(left: number, right: number): number;
        div(left: number, right: number): number;
        copysign(left: number, right: number): number;
        min(left: number, right: number): number;
        max(left: number, right: number): number;
        eq(left: number, right: number): number;
        ne(left: number, right: number): number;
        lt(left: number, right: number): number;
        le(left: number, right: number): number;
        gt(left: number, right: number): number;
        ge(left: number, right: number): number;
    } | {
        load(offset: number, align: number, ptr: number): number;
        store(offset: number, align: number, ptr: number, value: number): number;
        const(value: number): number;
        const_bits(low: number, high: number): number;
        neg(value: number): number;
        abs(value: number): number;
        ceil(value: number): number;
        floor(value: number): number;
        trunc(value: number): number;
        nearest(value: number): number;
        sqrt(value: number): number;
        reinterpret(value: number): number;
        convert_s: {
            i32(value: number): number;
            i64(value: number): number;
        };
        convert_u: {
            i32(value: number): number;
            i64(value: number): number;
        };
        promote(value: number): number;
        add(left: number, right: number): number;
        sub(left: number, right: number): number;
        mul(left: number, right: number): number;
        div(left: number, right: number): number;
        copysign(left: number, right: number): number;
        min(left: number, right: number): number;
        max(left: number, right: number): number;
        eq(left: number, right: number): number;
        ne(left: number, right: number): number;
        lt(left: number, right: number): number;
        le(left: number, right: number): number;
        gt(left: number, right: number): number;
        ge(left: number, right: number): number;
    };
}
