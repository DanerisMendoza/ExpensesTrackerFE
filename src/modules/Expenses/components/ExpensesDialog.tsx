import { Button, Modal, NumberInput, TextInput } from "@mantine/core";
import Swal from "sweetalert2";
import axiosInstance from "@src/api";
import { useForm } from "@mantine/form";

export default function ExpensesDialog({ onDialogClose, action, setAction }: { onDialogClose: () => void, action: string, setAction: (value: string) => void }) {
    interface FormData {
        title: string;
        amount: number;
    }

    const form = useForm({
        initialValues: { title: "", amount: 0 },
        validate: {
            title: (value: string) => {
                if (value.length <= 0) {
                    return "Title cannot be empty";
                } else if (value.length < 2) {
                    return "Title must have at least 2 characters";
                }
            },
            amount: (value: number) => {
                if (value <= 0) {
                    return "Amount must be greater than zero";
                }
            },
        },
    });

    const onSubmit = async (params: FormData) => {
        const payload = {
            title: params.title,
            amount: params.amount,
        };

        await axiosInstance
            .post("/api/createExpenses", payload)
            .then((response) => {
                if (response.status === 200) {
                    setAction('');
                    form.reset();
                    onDialogClose();
                }
            })
            .catch((error) => {
                const message = error.response?.data?.message || "Something went wrong!";
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: message,
                });
            });
    };

    return (
        <Modal
            opened={action === "NewExpenses"}
            onClose={() => setAction("")}
            title="New Expense"
            centered
            size="xl"
            padding={30}
        >
            <form onSubmit={form.onSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 rounded-lg">
                    <TextInput
                        variant="filled"
                        size="md"
                        radius="md"
                        placeholder="Enter Title"
                        {...form.getInputProps("title")}
                    />
                    <NumberInput
                        variant="filled"
                        size="md"
                        radius="md"
                        placeholder="Enter Amount"
                        {...form.getInputProps("amount")}
                    />
                    <Button type="submit" className="border-none bg-blue-300 poppins text-white">
                        Submit
                    </Button>
                </div>
            </form>
        </Modal>
    );
}