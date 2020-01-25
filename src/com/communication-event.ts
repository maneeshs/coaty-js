/*! Copyright (c) 2018 Siemens AG. Licensed under the MIT License. */

import { Uuid } from "..";

/**
 * Predefined event types used by Coaty communication event patterns.
 * Note: add new types to the end to maintain existing enum values.
 */
export enum CommunicationEventType {
    Raw = 0,
    Advertise,
    Deadvertise,
    Channel,
    Discover,
    Resolve,
    Query,
    Retrieve,
    Update,
    Complete,
    Associate,
    IoValue,
    Call,
    Return,

    // Indicates the valid range of event type enum values.
    MAX,
}

/**
 * Base generic communication event class
 */
export abstract class CommunicationEvent<T extends CommunicationEventData> {

    /** @internal For internal use in framework only. Do not use in application code. */
    abstract get eventType(): CommunicationEventType;

    /** @internal For internal use in framework only. Do not use in application code. */
    get eventTypeFilter(): string {
        return undefined;
    }

    /** @internal For internal use in framework only. Do not use in application code. */
    eventRequest: CommunicationEvent<CommunicationEventData> = undefined;

    private _eventSourceId: Uuid;
    private _eventUserId: Uuid | string;

    /**
     * @internal For internal use in framework only. Do not use in application code.
     * 
     * Create an event instance for the given event type.
     *
     * @param eventData data associated with this event
     */
    constructor(private _eventData: T) {
    }

    /**
     * Gets the object ID of the event source object.
     */
    get eventSourceId() {
        return this._eventSourceId;
    }

    /**
     * @internal For internal use in framework only.
     *
     * Sets the object ID of the event source object.
     */
    set eventSourceId(sourceId: Uuid) {
        this._eventSourceId = sourceId;
    }

    /**
     * Gets the event data of this event.
     */
    get eventData() {
        return this._eventData;
    }

    /**
     * Gets the user ID of this event.
     * Returns undefined if this is not a user-associated event.
     */
    get eventUserId() {
        return this._eventUserId;
    }

    /**
     * @internal For internal use in framework only.
     *
     * Sets the user ID associated with this event.
     */
    set eventUserId(userId: Uuid | string) {
        this._eventUserId = userId;
    }

}

/**
 * The base class for communication event data
 */
export abstract class CommunicationEventData {

    /**
     * @internal For internal use in framework only.
     * 
     * Returns an object with event data properties to be serialized by JSON.
     */
    abstract toJsonObject(): { [key: string]: any };
}
