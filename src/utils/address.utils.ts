import axios from 'axios';
import { IAddress } from 'interfaces';
import { HTTP_CODE } from '../constants';
/**
 *
 * @param searchTerm - uriEncoded searchTerm for googleMaps API.
 * @returns Promise<number | Record<string, any>> - returns the response from googleMaps API in json format. or HTTP_CODE HTTP_CODE.INTERNAL_ERROR if the request failed.
 */
async function RetriveGeoData(searchTerm: string): Promise<number | Record<string, string | any>> {
    const key = process.env.GEO_KEY;
    const url = process.env.GEO_URL;
    const geoData = await axios.get(`${url}/${searchTerm}&key=${key}`);
    const geoDataJSON = JSON.parse(geoData.data);
    if (geoDataJSON.status !== 'OK') return HTTP_CODE.INTERNAL_ERROR;
    return geoDataJSON;
}
/**
 *This function resovles type by given key
 *
 * @param addressObj - an address object.
 * @returns Promise<string | Record<string, any>> - returns an IAddress resolved object.
 */
function resolveByType(addressObj: any): IAddress {
    let resolvedObj: Record<string, string | any> = {};
    for (let component of addressObj) {
        if (component.type === 'route' || component.type === 'street') resolvedObj.Street = component.long_name;
        if (component.type === 'sublocality') resolvedObj.City = component.long_name;
        if (component.type === 'administrative_area_level_1') resolvedObj.State = component.long_name;
        if (component.type === 'postal_code') resolvedObj.PostalCode = component.long_name;
        if (component.type === 'country') {
            resolvedObj.Country = component.long_name;
            resolvedObj.CountryCode = component.short_name;
        }
    }
    return resolvedObj as IAddress;
}
/**
 *
 * @param searchTerm
 * @returns
 */
async function Resolve(searchTerm: string): Promise<IAddress | number> {
    const geoData = await RetriveGeoData(searchTerm);
    if (typeof geoData === 'number') return HTTP_CODE.INTERNAL_ERROR;
    const addressComp = geoData.results.address_components;
    return resolveByType(addressComp);
}

export { Resolve };
