import {defineStore} from "pinia";

export const useCategoryStore = defineStore('categoryStore',{
    state: () => ({
        categories: ['aasdsdsadsa', 'sadsadasdsa'],
    }),
    actions: {
        createCategory(newCategory) {
            this.categories.push(newCategory)
        }
    }
})