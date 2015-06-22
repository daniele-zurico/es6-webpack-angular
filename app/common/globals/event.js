/**
 * Created by waeljammal on 02/04/15.
 */
import BaseClass from './base-class';

export default class Event extends BaseClass {
    constructor(event, data) {
        this.event = event;
        this.data = data;
    }
    stopPropagation() {

    }
}