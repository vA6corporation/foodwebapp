import { formatDate } from "@angular/common";

export const ticket80mm = (food: any, customer: any, turn: any, countFood: any) => {
    return {
        defaultStyle: {
            fontSize: 9,
        },
        styles: {
            header: {
                fontSize: 14,
                bold: true
            },
            subtitle: {
                fontSize: 10,
                bold: true,
            },
        },
        pageSize: { width: 220, height: 200 },
        pageOrientation: 'portrait',
        pageMargins: [20, 0, 20, 30],
        content: [
            {
                text: `N° ${countFood}`,
                style: 'header',
                alignment: 'center'
            },
            {
                text: `${turn.food}`,
                style: 'header',
                alignment: 'center'
            },
            {
                text: `====================`,
                style: 'header',
                alignment: 'center'
            },
            {
                text: `${customer.name}`,
                style: 'subtitle',
                alignment: 'center'
            },
            {
                text: `DNI: ${customer.dni}`,
                style: 'subtitle',
                alignment: 'center'
            },
            {
                text: `${customer.business.businessName}`,
                style: 'subtitle',
                alignment: 'center'
            },
            '\n',
            {
                text: `F/H: ${formatDate(new Date(), 'dd MMM yyyy, hh:mm a', 'en-US')}`,
                style: 'subtitle',
                alignment: 'center'
            },
            '\n',
            '\n',
            '.'
        ]
    };
}