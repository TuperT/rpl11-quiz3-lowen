import { Button, Divider, Flex, Modal, Space, Tag } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import Title from "antd/es/typography/Title"
import type { transactions } from "../data/transactions"

type DetailModalProps = {
    open: boolean
    transaction: transactions | null
    onCancel: () => void
}

export const DetailModal = ({ open, transaction, onCancel }: DetailModalProps) => {
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={
                <>
                    <Divider size="medium" />
                    <Button onClick={onCancel}>Close</Button>
                </>
            }
        >
            <Flex vertical>
                <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                    TRANSACTION DETAIL
                </Paragraph>
                <Title level={4} style={{ margin: 0 }}>
                    {transaction?.id}
                </Title>
                <Space>
                    <Tag
                        variant="outlined"
                        color={
                            transaction?.status == "SUCCESS" ? "green"
                            : transaction?.status == "PENDING" ? "orange"
                            : transaction?.status == "FAILED" ? "red" : ""
                        }
                        style={{ borderRadius: "1rem", fontWeight: "600", padding: "0 0.8rem 0 0.8rem", fontSize: "0.7rem" }}
                    >
                        {transaction?.status}
                    </Tag>

                    <Tag
                        variant="outlined"
                        color={transaction?.type == "Deposit" ? "" : "geekblue"}
                        style={{ borderRadius: "1rem", fontWeight: "600", fontSize: "0.7rem" }}
                    >
                        {transaction?.type}
                    </Tag>
                </Space>
            </Flex>

            <Divider size="small" />

            <Tag variant="outlined" style={{ width: "100%", padding: "0.6rem 0.8rem 0.6rem 0.8rem", backgroundColor: "#f1f5f9" }}>
                <Flex justify="space-between" align="center">
                    <Paragraph style={{ margin: 0, opacity: 0.8, fontSize: "0.8rem" }}>
                        AMOUNT
                    </Paragraph>
                    <Title level={4} style={{ margin: 0 }}>
                        {transaction?.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </Title>
                </Flex>
            </Tag>

            <Flex vertical style={{ margin: "0.8rem 0 0 0" }}>
                <Flex vertical>
                    <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                        CUSTOMER
                    </Paragraph>

                    <Flex justify="space-between" align="flex-start">
                        <Flex vertical style={{ flex: 1 }}>
                            <Paragraph type="secondary" style={{ fontSize: "0.6rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                Name
                            </Paragraph>

                            <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                {transaction?.customer.name}
                            </Paragraph>
                        </Flex>

                        <Flex vertical style={{ flex: 1 }}>
                            <Paragraph type="secondary" style={{ fontSize: "0.6rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                Email
                            </Paragraph>

                            <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                {transaction?.customer.email}
                            </Paragraph>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex vertical>
                    <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: "1rem 0 0 0" }}>
                        PAYMENT
                    </Paragraph>

                    <Flex justify="space-between" align="flex-start">
                        <Flex vertical style={{ flex: 1 }}>
                            <Paragraph type="secondary" style={{ fontSize: "0.6rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                Method
                            </Paragraph>
                            <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                {transaction?.method}
                            </Paragraph>
                        </Flex>

                        <Flex vertical style={{ flex: 1 }}>
                            <Paragraph type="secondary" style={{ fontSize: "0.6rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                Bank
                            </Paragraph>
                            <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                {transaction?.bank ?? "Not Applicable"}
                            </Paragraph>
                        </Flex>
                    </Flex>

                    <Flex vertical style={{ flex: 1, margin: "0.4rem 0 0 0" }}>
                        <Paragraph type="secondary" style={{ fontSize: "0.6rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                            Reference
                        </Paragraph>
                        <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                            {transaction?.reference}
                        </Paragraph>
                    </Flex>
                </Flex>

                <Flex vertical>
                    <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: "1rem 0 0 0" }}>
                        PROCESSING
                    </Paragraph>

                    <Flex justify="space-between" align="flex-start">
                        <Flex vertical style={{ flex: 1 }}>
                            <Paragraph type="secondary" style={{ fontSize: "0.6rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                Created At
                            </Paragraph>

                            <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                {transaction?.createdAt}
                            </Paragraph>
                        </Flex>

                        <Flex vertical style={{ flex: 1 }}>
                            <Paragraph type="secondary" style={{ fontSize: "0.6rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                Processed At
                            </Paragraph>

                            <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                                {transaction?.processedAt ? transaction?.processedAt : "Not processed yet"}
                            </Paragraph>
                        </Flex>
                    </Flex>

                    <Flex vertical style={{ flex: 1, margin: "0.4rem 0 0 0" }}>
                        <Paragraph type="secondary" style={{ fontSize: "0.6rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                            Approved By
                        </Paragraph>
                        <Paragraph style={{ fontSize: "0.8rem", fontWeight: "600", opacity: 0.8, margin: 0 }}>
                            {transaction?.approvedBy ? transaction?.approvedBy : "Not approved yet"}
                        </Paragraph>
                    </Flex>
                </Flex>
            </Flex>
        </Modal>
    )
}