import { DeleteOutlined } from "@ant-design/icons"
import { Avatar, Button, Flex, Modal, Space, Tag } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import Title from "antd/es/typography/Title"
import type { transactions } from "../data/transactions"

type DeleteModalProps = {
    open: boolean
    transaction: transactions | null
    onCancel: () => void
    onDelete: (transactionId: string) => void
}

export const DeleteModal = ({ open, transaction, onCancel, onDelete }: DeleteModalProps) => {
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={
                <Flex justify="flex-end">
                    <Space>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                if (transaction?.id) {
                                    onDelete(transaction.id)
                                }
                            }}
                        >
                            Delete
                        </Button>
                    </Space>
                </Flex>
            }
        >
            <Flex vertical style={{ padding: "0.5rem 0" }}>
                <Avatar
                    icon={<DeleteOutlined />}
                    style={{
                        backgroundColor: "#FDECEB",
                        color: "#B42318",
                        padding: "1.3rem",
                        fontSize: "1.3rem",
                        margin: "0 0 0.8rem 0",
                    }}
                />
                <Title level={5} style={{ margin: 0, fontWeight: "bold" }}>
                    Delete this transaction?
                </Title>

                <Paragraph type="secondary" style={{ fontWeight: 600, margin: "0.75rem 0 0 0" }}>
                    You’re about to permanently remove <Tag>{transaction?.id}</Tag> <br /> from the table.
                    ({transaction?.customer.name}, {transaction?.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })})
                    This can’t be undone.
                </Paragraph>
            </Flex>
        </Modal>
    )
}