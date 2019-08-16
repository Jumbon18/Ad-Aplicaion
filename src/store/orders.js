import * as fb from 'firebase'

class Order {
    constructor(name, phone, adId, done = false, id = null) {
        this.name = name;
        this.phone = phone;
        this.adId = adId;
        this.done = done;
        this.id = id;
    }
}

export default {
    state: {
        orders: []
    },
    mutations: {
        loadOrders(state, payload) {
            state.orders = payload;
        }
    },
    actions: {
        async createOrder({commit}, {name, phone, adId, ownerId}) {
            const order = new Order(name, phone, adId);
            commit('clearError');
            try {
                await fb.database().ref(`/users/${ownerId}/orders`).push(order);

            } catch (e) {
                commit('setError', e.message);
                throw e;
            }
        },
        async fetchOrders({commit, getters}) {
            commit('setLoading', true);
            commit('clearError');
            const resulOrders = [];

            try {
                const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value');
                const orders = fbVal.val();
                Object.keys(orders).forEach(key => {
                    const order = orders[key];
                    resulOrders.push(new Order(order.name, order.phone, order.adId, order.done, key));
                    commit('loadOrders', resulOrders);
                });
                commit('setLoading', false);

            } catch (e) {
                commit('setError', e.message);
                commit('setLoading', false);
            }
        },
        async markOrderDone({commit,getters},payload){
        commit('clearError');
            try{
       await  fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
                done:true
            });

        }catch(e){
            commit('setError',e.message);
            throw e;
        }
        }
    },
    getters: {
        doneOrder(state) {
            return state.orders.filter(o => o.done)
        },
        undoneOrder(state) {
            return state.orders.filter(o => !o.done);
        },
        orders(state, getters) {
            return getters.undoneOrder.concat(getters.doneOrder);
        }
    }
}