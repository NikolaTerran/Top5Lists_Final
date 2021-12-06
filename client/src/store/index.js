import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
import AuthContext from '../auth'

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SET_SAVE_STATE: "SET_SAVE_STATE",
    LOAD_LIST_OBJS: "LOAD_LIST_OBJS",
    SWITCH_TAB: "SWITCH_TAB",
    RESET: "RESET",
    REFRESH: "REFRESH",
    CLEAR_OBJS: "CLEAR_OBJS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentList: null,
        newListCounter: 0,
        isListNameActive: false,
        isItemActive: false,
        listMarkedForDeletion: null,
        saveState: "",
        listObjs: [],
        tab: 0,
        doNothing: 0,
        searchBarText: "",
        guest: 0
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: payload.listObjs,
                    tab: store.tab,
                    doNothing: 0,
                    guest: store.guest
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: store.listObjs,
                    tab: store.tab,
                    doNothing: 0,
                    guest: store.guest
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: store.listObjs,
                    tab: store.tab,
                    doNothing: 0,
                    guest: store.guest
                })
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    saveState: store.saveState,
                    listObjs: store.listObjs,
                    tab: store.tab,
                    doNothing: 0,
                    guest: store.guest
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: store.listObjs,
                    tab: store.tab,
                    doNothing: 0,
                    guest: store.guest
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: store.listObjs,
                    tab: store.tab,
                    doNothing: 0,
                    guest: store.guest
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: payload,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: store.listObjs,
                    tab: store.tab,
                    doNothing: 0,
                    guest: store.guest
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: payload,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: store.listObjs,
                    tab: store.tab,
                    doNothing: 0,
                    guest: store.guest
                });
            }
            // SET SAVE STATE
            case GlobalStoreActionType.SET_SAVE_STATE: {
                return setStore({
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: payload,
                    listObjs: store.listObjs,
                    tab: store.tab,
                    doNothing: 0,
                    guest: store.guest
                })
            }
            // LOAD LIST OBJS
            case GlobalStoreActionType.LOAD_LIST_OBJS: {
                return setStore({
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: payload.Objs,
                    tab: payload.Tab,
                    doNothing: 0,
                    searchBarText: payload.searchBarText,
                    guest: store.guest
                })
            }
            // SWITCH TAB
            case GlobalStoreActionType.SWITCH_TAB: {
                return setStore({
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: store.listObjs,
                    tab: payload,
                    doNothing: 0,
                    guest: store.guest
                })
            }
            // GET RID OF EVERYTHING
            case GlobalStoreActionType.RESET: {
                return setStore({
                    currentList: null,
                    newListCounter: 0,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: "",
                    listObjs: null,
                    tab: 0,
                    doNothing: 0,
                    guest: store.guest
                })
            }
            // do something
            case GlobalStoreActionType.REFRESH: {
                return setStore({
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: store.listObjs,
                    tab: store.tab,
                    doNothing: payload,
                    guest: store.guest
                })
            }
            // clear objs
            case GlobalStoreActionType.CLEAR_OBJS:{
                return setStore({
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    saveState: store.saveState,
                    listObjs: null,
                    tab: 2,
                    doNothing: 0,
                    guest: store.guest
                })
            }
            // init guest mode
            case GlobalStoreActionType.GUEST:{
                return setStore({
                    listObjs: payload,
                    tab: 3,
                    guest: 1
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListObjs(top5List) {
                        response = await api.getTop5ListObjs();
                        if (response.data.success) {
                            let objs = response.data.Objs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    listObjs: objs,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListObjs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    store.refresh = function (){
        let ran = Math.floor(Math.random() * 100);
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: ran
        });
    }

    store.initGuest = async function (){
        try{
            const response = await api.getCommunityLists();
            if (response.data.success) {
                let objs= response.data.Objs;
                storeReducer({
                    type: GlobalStoreActionType.GUEST,
                    payload: objs
                });
            }   
        }catch{
            console.log("API FAILED TO GET ALL LIST OBJS");
        }
    } 

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email,
            userName: auth.user.firstName + " " + auth.user.lastName,
            likes: [],
            dislikes: [],
            views: 0,
            comments: [],
            status: "not published"
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            tps.clearAllTransactions();
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.loadListObjs = async function () {
        try{
            const response = await api.getTop5ListObjs();
            if (response.data.success) {
                let objs= response.data.Objs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_LIST_OBJS,
                    payload: {Objs: objs, Tab: 0}
                });
            }   
        }catch{
            console.log("API FAILED TO GET THE LIST OBJS");
        }
    }

    store.loadCom = async function () {
        try{
            const response = await api.getCommunityLists();
            if (response.data.success) {
                let objs= response.data.Objs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_LIST_OBJS,
                    payload: {Objs: objs, Tab: 3}
                });
            }   
        }catch{
            console.log("API FAILED TO GET COMMUNITY LIST OBJS");
        }
    }

    store.loadUserLists = async function (param) {
        try{
            const response = await api.getUserListObjs(param);
            if (response.data.success) {
                let objs= response.data.Objs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_LIST_OBJS,
                    payload: {Objs: objs, Tab: 2}
                });
            }   
        }catch{
            console.log("API FAILED TO GET USER LIST OBJS");
            auth.setAlert("The user does not exist or owns any list!");
        }
    }

    store.filterOwned = async function (param) {
        if(param === ""){
            store.loadListObjs()
        }else{
            try{
                const response = await api.getTop5ListObjs();
                if (response.data.success) {
                    let objs= response.data.Objs.filter(obj => obj.name.includes(param));
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_LIST_OBJS,
                        payload: {Objs: objs, Tab: 0}
                    });
                }   
            }catch{
                console.log("API FAILED TO GET THE LIST OBJS");
            }
        }
    }

    store.filterAll = async function (param) {
        if(param === ""){
            store.loadAll()
        }else{
            try{
                const response = await api.getAll();
                if (response.data.success) {
                    let objs= response.data.Objs.filter(obj => obj.name.includes(param))
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_LIST_OBJS,
                        payload: {Objs: objs, Tab: 1, searchBarText:param}
                    });
                } 
            }catch{
                console.log("error")
            }
        }
    }

    store.filterCom = async function (param) {
        if(param === ""){
            store.loadCom()
        }else{
            try{
                const response = await api.getCommunityLists();
                if (response.data.success) {
                    let objs= response.data.Objs.filter(obj => obj.name.includes(param));
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_LIST_OBJS,
                        payload: {Objs: objs, Tab: 3}
                    });
                }   
            }catch{
                console.log("API FAILED TO GET COMMUNITY LIST OBJS");
            }
        }
    }

    store.loadAll = async function () {
        try{
            const response = await api.getAll();
            if (response.data.success) {
                let objs= response.data.Objs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_LIST_OBJS,
                    payload: {Objs: objs, Tab: 1}
                });
            }   
        }catch{
            console.log("API FAILED TO GET ALL LIST OBJS");
        }
    }

    store.sort = function (param){
        let newListObjs = null
        if(param === 0){
            newListObjs = store.listObjs.sort(function(a,b){
                let d1 = new Date(a.updatedAt)
                let d2 = new Date(b.updatedAt)
                return d1 - d2
            })
        }else if(param === 1){
            newListObjs = store.listObjs.sort(function(a,b){
                let d1 = new Date(a.updatedAt)
                let d2 = new Date(b.updatedAt)
                return d2 - d1
            })
        }else if(param === 2){
            newListObjs = store.listObjs.sort(function(a,b){
                return b.views - a.views
            })
        }else if(param === 3){
            newListObjs = store.listObjs.sort(function(a,b){
                return b.likes.length - a.likes.length
            })
        }else if(param === 4){
            newListObjs = store.listObjs.sort(function(a,b){
                return b.dislikes.length - a.dislikes.length
            })
        }
        storeReducer({
            type: GlobalStoreActionType.LOAD_LIST_OBJS,
            payload: {Objs: newListObjs, Tab: store.tab}
        });
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadListObjs();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.resetCurrentList = function() {
        storeReducer({
            type: GlobalStoreActionType.RESET,
            payload: null
        });
    }


    store.addMoveItemTransaction = function (start, end) {
        let transaction = new MoveItem_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.addUpdateItemTransaction = function (index, newText) {
        let oldText = store.currentList.items[index];
        let transaction = new UpdateItem_Transaction(store, index, oldText, newText);
        tps.addTransaction(transaction);
    }

    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.increaseView = async function (list){
        list.views += 1
        if(store.tab===3){
            const response = await api.updateCommunityList(list._id, list);
            if (response.data.success) {
                store.refresh()
            }
        }else{
            const response = await api.updateTop5ListById(list._id, list);
            if (response.data.success) {
                store.refresh()
            }
        }
    }

    store.like = async function (list){
        const index = list.likes.indexOf(auth.user.email)
        if(store.tab===3){
            if(index === -1){
                list.likes.push(auth.user.email)
                if(list.dislikes.indexOf(auth.user.email) > -1){
                    list.dislikes.splice(index, 1);
                }
                const response = await api.updateCommunityList(list._id, list);
                if (response.data.success) {
                    //store.loadListObjs()
                    store.refresh()
                }
            }else{
                list.likes.splice(index, 1);
                const response = await api.updateCommunityList(list._id, list);
                if (response.data.success) {
                    //store.loadListObjs()
                    store.refresh()
                }
            }
        }else{
            if(index === -1){
                list.likes.push(auth.user.email)
                if(list.dislikes.indexOf(auth.user.email) > -1){
                    list.dislikes.splice(index, 1);
                }
                const response = await api.updateTop5ListById(list._id, list);
                if (response.data.success) {
                    //store.loadListObjs()
                    store.refresh()
                }
            }else{
                list.likes.splice(index, 1);
                const response = await api.updateTop5ListById(list._id, list);
                if (response.data.success) {
                    //store.loadListObjs()
                    store.refresh()
                }
            }
        }
    }

    store.dislike = async function (list){
        const index = list.dislikes.indexOf(auth.user.email)
        if(store.tab === 3){
            if(index === -1){
                list.dislikes.push(auth.user.email)
                if(list.likes.indexOf(auth.user.email) > -1){
                    list.likes.splice(index, 1);
                }
                const response = await api.updateCommunityList(list._id, list);
                if (response.data.success) {
                    //store.loadListObjs()
                    store.refresh()
                }
            }else{
                list.dislikes.splice(index, 1);
                const response = await api.updateCommunityList(list._id, list);
                if (response.data.success) {
                    //store.loadListObjs()
                    store.refresh()
                }
            }
        }else{
            if(index === -1){
                list.dislikes.push(auth.user.email)
                if(list.likes.indexOf(auth.user.email) > -1){
                    list.likes.splice(index, 1);
                }
                const response = await api.updateTop5ListById(list._id, list);
                if (response.data.success) {
                    //store.loadListObjs()
                    store.refresh()
                }
            }else{
                list.dislikes.splice(index, 1);
                const response = await api.updateTop5ListById(list._id, list);
                if (response.data.success) {
                    //store.loadListObjs()
                    store.refresh()
                }
            }
        }
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    store.submitComment = async function(list, param) {
        let comment = {user: auth.user.firstName + " " + auth.user.lastName,
                       words: param}
        list.comments.push(comment)
        if(store.tab === 3){
            const response = await api.updateCommunityList(list._id, list);
            if (response.data.success) {
                //store.loadListObjs()
                store.refresh()
            }
        }else{
            const response = await api.updateTop5ListById(list._id, list);
            if (response.data.success) {
                //store.loadListObjs()
                store.refresh()
            }
        }
    }

    store.save = function(){
        storeReducer({
            type: GlobalStoreActionType.SET_SAVE_STATE,
            payload: store.currentList._id
        })
        tps.clearAllTransactions()
    }

    store.unsave = function(){
        storeReducer({
            type: GlobalStoreActionType.SET_SAVE_STATE,
            payload: ""
        })
    }

    store.publish = function(){
        let newList = store.currentList
            newList.status = "published"

        storeReducer({
            type: GlobalStoreActionType.SET_SAVE_STATE,
            payload: ""
        })
        
        async function pb(param){
            const response = await api.publishList(store.currentList._id, param);
            if (response.data.success) {
                //do nothing
            }}
        pb(newList)
        store.closeCurrentList()
    }

    store.undo = function () {
        tps.undoTransaction();
    }

    store.redo = function () {
        tps.doTransaction();
    }

    store.canUndo = function() {
        return tps.hasTransactionToUndo();
    }

    store.canRedo = function() {
        return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function (cond) {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: cond
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function (cond) {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: cond
        });
    }

    store.clearObjs = function (){
        storeReducer({
            type: GlobalStoreActionType.CLEAR_OBJS,
            payload: null
        })
    }
    // store.switchTab = function (cond) {
    //     function hi(){if(cond === 0){
    //         store.loadListObjs()
    //     }else if(cond === 1){
    //         store.loadAll()
    //     }}
        
        
    //     function function1( callback) {
    //         storeReducer({
    //             type: GlobalStoreActionType.SWITCH_TAB,
    //             payload: cond
    //         })
    //         callback();
    //     } 
    //     function1(hi)
    // }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };