import uniqid from 'uniqid';
import * as fb from 'firebase';

class Ad {
    constructor(title, description, ownerId, imageScr = '', promo = false,id = null){
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.imageScr = imageScr;
        this.promo = promo;
        this.id = id;
    }
}

export default {
    state: {
        ads: []
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload);
        },
        loadAds(state,payload){
            state.ads = payload;
        },
        updateAd(state,{title,description,id}){
            const ad = state.ads.find((el)=> el.id === id);
            if(ad){
                ad.title = title;
                ad.description = description;
            }
        }
    },
    actions: {
        async fetchAds({commit}){
            commit('clearError');
            commit('setLoading',true);
            const resultAds = [];
            try{
              const fbVal = await  fb.database().ref('ads').once('value');
              const ads = fbVal.val();
              console.log(ads);
    Object.keys(ads).forEach(key => {
        const ad = ads[key];
        resultAds.push(new Ad(ad.title, ad.description, ad.ownerId, ad.imageScr, ad.promo, key));
    });
    console.log(resultAds);
    commit('loadAds', resultAds);
    commit('setLoading', false);

            }catch(e){
                commit('setError',`${e.message} Hello`);
                commit('setLoading',false);
                throw e;
            }
        },
        async createAd({commit,getters}, payload) {
            //payload.id = uniqid();
            commit('clearError');
            commit('setLoading', true);
            const image = payload.imageScr;
            try {
                const newAd = new Ad(
                    payload.title,
                    payload.description,
                    getters.user.id,
                  '',
                    payload.promo);

     const ad = await fb.database().ref('ads').push(newAd);
     console.log(ad);
     //Todo: Проверить зачем такое дебильный процесс установки изображения

     const imageExt =image.name.slice(image.name.lastIndexOf('.'));
     const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image);
     const imageScr = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).getDownloadURL();
     console.log(imageScr);
       await fb.database().ref('ads').child(ad.key).update({
           imageScr
       });



     commit('setLoading',false);
     commit('createAd',{
         ...newAd, id:ad.key,imageScr
     })

            } catch (e) {
                commit('setError', e.message);
                commit('setLoading', false);
                throw e;
            }
            //
            // commit('createAd',payload);
        },
        async updateAd({commit},{title,description,id}){
            commit('clearError');
            commit('setLoading',true);
            try{
          await fb.database().ref('ads').child(id).update({
              title,description
          });
          commit('updateAd',{
              title,description,id
          });
                commit('setLoading',false);
            }
            catch (e) {
                commit('setError',e.message);
                commit('setLoading',false);
            throw e;
            }
        }
    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter((ad) => ad.promo)
        },
        myAds(state,getters) {
            return state.ads.filter(ad => ad.ownerId === getters.user.id);
        },
        adById(state) {
            return adId => {
                return  state.ads.find(ad => ad.id === adId);

            }
        }
    }
}