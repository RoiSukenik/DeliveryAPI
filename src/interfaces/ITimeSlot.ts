interface SupportedAddresses {
    CountryCode: string;
    City: string;
    State: string;
}
interface ITimeSlot {
    Start: Date;
    End: Date;
    SupportedAddresses: [SupportedAddresses];
}

export default ITimeSlot;
