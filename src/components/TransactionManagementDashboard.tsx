import { Button, Flex,  Input,  Popover,  Space, Table, Tag, type TableColumnsType, type TableProps } from "antd"
import { transactionsData, type transactions } from "../data/transactions"
import Paragraph from "antd/es/typography/Paragraph"
import { DeleteOutlined, InfoCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { useState } from "react"
import Title from "antd/es/typography/Title"
import { DeleteModal } from "./DeleteModal"
import { DetailModal } from "./DetailModal"

const TransactionManagementDashboard = () => {
    const [data, setData] = useState(transactionsData)

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [detailData, setDetailData] = useState<transactions | null>(null)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<transactions | null>(null)

    const [isPopOverOpen, setIsPopOverOpen] = useState(false)

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [selectedRows, setSelectedRows] = useState<transactions[]>([])

    const [filterData, setFilterData] = useState("")
    const [filteredData, setFilteredData] = useState(transactionsData)

    const handleSearch = () => {
        setFilteredData(data.filter(data => 
        data.customer.name.includes(filterData)
        || data.id.includes(filterData)
        || data.customer.email.includes(filterData)))
    }
    
    const handleDeleteTransaction = (transactionId: string) => {
        setData((prev) => prev.filter((item) => item.id !== transactionId))
        setIsDeleteModalOpen(false)
        setDeleteTarget(null)
    }

    const handleDeleteSelected = () => {
        const deleteItems = new Set<string>()
        
        selectedRowKeys.map((key) => deleteItems.add(key.toString()))

        setFilteredData((prev) =>
            prev.filter((item => !deleteItems.has(item.id)))
        )

        setSelectedRowKeys([])
        setSelectedRows([])
        setIsPopOverOpen(false)
    }

    const rowSelection: TableProps<transactions>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: transactions[]) => {
            setSelectedRowKeys(selectedRowKeys)
            setSelectedRows(selectedRows)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: transactions) => ({
            disabled: record.status === 'PENDING',
            name: record.status,
        }),
    };

    const columns: TableColumnsType<transactions> = [
        {
            title: 'TRANSACTION ID',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => (
                <Paragraph type="secondary" style={{ margin: 0 }}>
                    {id}
                </Paragraph>
            )
        },
        { 
            title: 'CUSTOMER',
            key: 'customer',
            render: (_: any, transaction: transactions) => transaction.customer?.name 
        },
        { 
            title: 'EMAIL',
            key: 'email',
            render: (_: any, transaction: transactions) =>  (
                <Paragraph type="secondary" style={{ margin: 0 }}>
                    {transaction.customer?.email}
                </Paragraph>
            )
        },
        { 
            title: 'AMOUNT',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a: transactions, b: transactions) => a.amount - b.amount,
            render: (amount: number) => amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            filters: [
                {
                    text: 'Bank Transfer',
                    value: 'Bank transfer'
                },
                {
                    text: 'E-Wallet',
                    value: 'E-Wallet'
                }
            ],
            onFilter: (value, record) => record.method.indexOf(value as string) === 0,
        },
        { 
            title: 'Bank',
            dataIndex: 'bank',
            key:'bank',
            render: (bank: string) => (
                bank ?? <Paragraph type="secondary" style={{ margin: 0 }}>Not Applicable</Paragraph>
            )
        },
        { 
            title: 'TYPE',
            dataIndex: 'type',
            key: 'type',
            filters: [
                {
                    text: 'Deposit',
                    value: 'Deposit'
                },
                {
                    text: 'Withdrawal',
                    value: 'Withdrawal'
                }
            ],
            onFilter: (value, record) => record.type.indexOf(value as string) === 0,
            render: (type: string) => (
                <Tag 
                variant="outlined"
                color={type == "Deposit" ? "" : "geekblue"}
                style={{ borderRadius: "1rem", fontWeight: "600" }}
                >
                    {type}
                </Tag>
            )
        },
        { 
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'SUCCESS',
                    value: 'SUCCESS'
                },
                {
                    text: 'PENDING',
                    value: 'PENDING'
                },
                {
                    text: 'FAILED',
                    value: 'FAILED'
                }
            ],
            onFilter: (value, record) => record.status.indexOf(value as string) === 0,
            render: (status: string) => (
                <Tag 
                variant="outlined" 
                color={
                status == "SUCCESS" ? "green" 
                : status == "PENDING" ? "orange" 
                : status == "FAILED" ? "red" : "" }
                style={{ borderRadius: "1rem", fontWeight: "600", padding: "0 0.8rem 0 0.8rem" }}
                >
                    {status}
                </Tag>
            )
        },
        {
            title: 'PROCESSED BY',
            dataIndex: 'approvedBy',
            key: 'approvedBy',
            render: (_: any, transaction: transactions) =>
                <Paragraph 
                    type={
                    transaction.status === "FAILED" ? "danger" 
                    : transaction.status === "SUCCESS" ? "success" : "secondary"}
                    style={{ margin: 0 }}
                    >
                    {
                    transaction.status === 'SUCCESS'
                    ? `Approved by: ${transaction.approvedBy ?? '-'}` :
                    transaction.status === 'PENDING'
                    ? 'Waiting for approval'
                    : 'Transaction failed'
                    }
                </Paragraph>
        },
        { 
            title: 'CREATED AT',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a: transactions, b: transactions) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() 
        },
        {
            title: 'ACTION  ',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, transaction: transactions) => (
                <Space>
                    <Button 
                    icon={<InfoCircleOutlined />} 
                    style={{ color: "#1677ff" }}
                    onClick={() => {
                        setDetailData(transaction)
                        setIsDetailModalOpen(true)
                    }}
                    >
                        Detail
                    </Button>
                    {transaction.status === "SUCCESS" || transaction.status === "FAILED" 
                    ? (
                        <Button                        
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => {
                                setDeleteTarget(transaction)
                                setIsDeleteModalOpen(true)
                            }}
                        >
                            Delete
                        </Button>
                    ) : ""
                    }
                </Space>
            )
        }
    ]

    return (
        <>
            <DetailModal
                open={isDetailModalOpen}
                transaction={detailData}
                onCancel={() => {
                    setIsDetailModalOpen(false)
                    setDetailData(null)
                }}
            />

            <DeleteModal
                open={isDeleteModalOpen}
                transaction={deleteTarget}
                onCancel={() => {
                    setIsDeleteModalOpen(false)
                    setDeleteTarget(null)
                }}
                onDelete={handleDeleteTransaction}
            />

            <Flex vertical>
                <Title level={3} style={{ margin: 0 }}>Transaction Management</Title>
                <Paragraph type='secondary' style={{ margin: 0 }}>
                Review, filter, and manage customer transactions.
                </Paragraph>
            </Flex>

            <Flex justify="space-between" style={{ margin: "0.6rem 0 1rem 0" }}>
                <Space>
                    <Flex vertical>
                        <Paragraph style={{ margin: 0, fontFamily: "sans-serif" }}>Selected</Paragraph>
                        {selectedRowKeys?.length}
                    </Flex>
                    <Flex vertical>
                        <Paragraph style={{ margin: 0, fontFamily: "sans-serif" }}>Deleteable</Paragraph>
                        {selectedRowKeys?.length}
                    </Flex>
                </Space>

                <Space>
                    <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search by ID, name, or email"
                    value={filterData}
                    onChange={(e) => setFilterData(e.target.value)}
                    onPressEnter={handleSearch}
                    style={{ width: "20vw" }}
                    >
                    </Input>

                    {selectedRowKeys.length > 0 && (
                    <Popover
                        placement="bottomRight"
                        open={isPopOverOpen}
                        onOpenChange={setIsPopOverOpen}
                        trigger="click"
                        content={
                        <Flex vertical>
                            <Title level={5} style={{ margin: 0 }}>Delete selected transactions</Title>
                            <Paragraph type="secondary">
                            Are you sure you want to delete the selected transactions?
                            </Paragraph>

                            <Flex justify="flex-end" gap={4}>
                                <Button onClick={() => setIsPopOverOpen(false)}>Cancel</Button>
                                <Button
                                    icon={<DeleteOutlined />}
                                    danger
                                    onClick={handleDeleteSelected}
                                >
                                    Delete
                                </Button>
                            </Flex>
                        </Flex>
                        }
                    >
                        <Button
                        danger
                        onClick={() => setIsPopOverOpen(true)}
                        style={{ backgroundColor: "#B42318", color: "white", border: "none" }}
                        >
                        Delete Selected
                        </Button>
                    </Popover>
                    )}
                </Space>                
            </Flex>

            <Table 
            dataSource={filteredData}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: 'max-content' }}
            size="small"
            rowSelection={{ ...rowSelection }}
            />
        </>
    )
}

export default TransactionManagementDashboard