<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore';
import type { NewTransaction } from '@/types/transaction';
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { storeToRefs } from 'pinia';

const transactionsStore = useTransactionStore();
const { isAdding } = storeToRefs(transactionsStore);
const { addTransaction } = transactionsStore;

const date = ref();

const form = ref({
    title: '',
    amount: 0,
    type: 'income' as 'income' | 'expense',
    category: '',
    description: '',
    date: ''
});

const toast = useToast();

const handleSubmit = async () => {
    const newTransaction: NewTransaction = {
        title: form.value.title,
        amount: form.value.amount,
        type: form.value.type,
        category: form.value.category.toLowerCase(),
        date: form.value.date,
        description: form.value.description
    };

    try {
        await addTransaction(newTransaction);
        toast.success('Transaction added successfully!');
    } catch (err) {
        console.error('Failed to add transaction', err);
        toast.error('Failed to add transaction');
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="handleSubmit" :disabled="isAdding">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Add Transaction</h2>

            <div class="space-y-4">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <label for="type" class="block text-sm font-medium text-gray-600 mb-1">
                            Transaction Type
                        </label>
                        <div class="flex gap-4">
                            <button type="button" @click="form.type = 'income'" 
                                    :class="[
                                        'flex-1 px-4 py-2 rounded-lg transition-colors',
                                        form.type === 'income' 
                                            ? 'bg-emerald-500 text-white' 
                                            : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                                    ]">
                                Income
                            </button>
                            <button type="button" @click="form.type = 'expense'"
                                    :class="[
                                        'flex-1 px-4 py-2 rounded-lg transition-colors',
                                        form.type === 'expense' 
                                            ? 'bg-red-500 text-white' 
                                            : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                                    ]">
                                Expense
                            </button>
                        </div>
                    </div>

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

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                            Amount (kr)
                        </label>
                        <input
                            v-model="form.amount"
                            type="number"
                            id="amount"
                            name="amount"
                            class="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                            required
                            min="1"
                        />
                    </div>

                    <div class="flex-1">
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                            Category
                        </label>
                        <input
                            id="category"
                            v-model="form.category"
                            name="category"
                            class="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">
                        Date
                    </label>
                    <VueDatePicker 
                        v-model="form.date"
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
                    :disabled="isAdding"
                >
                    <i v-if="isAdding" class="pi pi-spin pi-spinner"></i>
                    <span>{{ isAdding ? 'Adding Transaction...' : 'Add Transaction' }}</span>
                </button>
            </div>
        </form>
    </div>
</template>