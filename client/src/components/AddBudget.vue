<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore';
import type { NewBudget } from '@/types/transaction';
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { storeToRefs } from 'pinia';

const transactionsStore = useTransactionStore();
const { loadingStates } = storeToRefs(transactionsStore);
const { addBudget, fetchBudgets } = transactionsStore;

const form = ref({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
});

const toast = useToast();

const handleSubmit = async () => {

    const newBudget: NewBudget = {
        title: form.value.title,
        startDate: form.value.startDate,
        endDate: form.value.endDate,
        description: form.value.description,
    };

    try {
        await addBudget(newBudget);
        await fetchBudgets();
        toast.success('Budget added successfully!');
    } catch (err) {
        console.error('Failed to add budget', err);
        toast.error('Failed to add budget');
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="handleSubmit" :disabled="loadingStates.addingBudget">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Add Budget</h2>

            <div class="space-y-4">
                <div class="flex flex-col gap-4">
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                            Title
                        </label>
                        <input
                            v-model="form.title"
                            type="text"
                            id="title"
                            name="title"
                            class="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">
                        Start date
                    </label>
                    <VueDatePicker 
                        v-model="form.startDate"
                        :enable-time-picker="false"
                        auto-apply
                        class="w-full"
                        input-class-name="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">
                        End date
                    </label>
                    <VueDatePicker 
                        v-model="form.endDate"
                        :enable-time-picker="false"
                        auto-apply
                        class="w-full"
                        input-class-name="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                    />
                </div>


                <div>
                    <label for="description" class="block text-sm font-medium text-gray-600 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        v-model="form.description"
                        name="description"
                        class="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <button
                    class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center cursor-pointer justify-center gap-2 mt-4"
                    type="submit"
                    :disabled="loadingStates.addingBudget"
                >
                    <i v-if="loadingStates.addingBudget" class="pi pi-spin pi-spinner"></i>
                    <span>{{ loadingStates.addingBudget ? 'Adding Budget...' : 'Add Budget' }}</span>
                </button>
            </div>
        </form>
    </div>
</template>