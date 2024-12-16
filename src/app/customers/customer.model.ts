import { BusinessModel } from "../businesses/business.model"

export interface CustomerModel {
    id: string
    dni: string
    name: string
    business: BusinessModel
}