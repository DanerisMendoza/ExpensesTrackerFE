import { Button, Modal, NumberInput, Text, TextInput } from "@mantine/core";
import { ExpensesStore } from "../ExpensesStore";
import Swal from "sweetalert2";
import axiosInstance from "@src/api";
import { useForm } from "@mantine/form";

export default function ExpensesDialog() {
    const { action, set_action } = ExpensesStore()

    interface FormData {
        title: string;
        amount: number;
    }

    const form = useForm({
        initialValues: { title: "", amount: 0 },
        validate: {
            title: (value: string) => {
                if (value.length <= 0) {
                    return "Title can not be empty";
                } else if (value.length < 2) {
                    return "Title must have at least 8 characters";
                }
            },
            amount: (value: number) => {
                if (value.toString().length < 0) {
                    return "Amount can not be empty";
                }
                else if (value <= 0) {
                    return "Amount can not be less than or equal zero";
                }
            },
        },
    });

    const onSubmit = async (params: FormData) => {
        const payload = {
            title: params.title,
            amount: params.amount,
        };
        console.log(payload)
        await axiosInstance
        .post("/api/createExpenses", payload)
        .then((response) => {
            if (response.status === 200) {
                set_action('')
                form.reset();
            }
        })
        .catch((error) => {
            const message = error.response.data.message;
            Swal.fire({
                icon: "error",
                title: "Login failed",
                text: message,
            });
        });
    };

    return (
        <>
            <Modal
                opened={action == "NewExpenses"}
                onClose={() => set_action("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title={"New Expenses"}
                centered
                size='xl'
                padding={30}
            >
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4  rounded-lg ">
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
        </>
    );
}