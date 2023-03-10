import Api from "./api";

export default {
    getData(){
        return Api().get('items')
    },
    create(employee_id,order_id,line_item) {
        return Api().post(`employees/${employee_id}/orders/${order_id}/line_items`, line_item)
    },
    delete(employee_id, order_id, line_item_id){
        return Api().delete(`employees/${employee_id}/orders/${order_id}/line_items/${line_item_id}`)
    }
}