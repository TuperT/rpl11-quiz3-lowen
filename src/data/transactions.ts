export type transactions = {
   id: string
   customer: {
      name: string
      email: string
   },
   amount: number
   method: "Bank Transfer" | "E-Wallet"
   bank: string | null
   type: "Deposit" | "Withdrawal"
   status: "SUCCESS" | "PENDING" | "FAILED"
   createdAt: string
   processedAt: string | null
   approvedBy: string | null
   reference: string
}

export const transactionsData: transactions[] = [{
      id: "TRX-20260801-001",
      customer: {name: "Andi Pratama", email: "andi.pratama@email.com",},
      amount: 1250000,
      method: "Bank Transfer",
      bank: "BCA",
      type: "Deposit",
      status: "SUCCESS",
      createdAt: "2026-08-01 09:15:23",
      processedAt: "2026-08-01 09:16:02",
      approvedBy: "Admin Finance",
      reference: "BCA-889231",
   }, {
      id: "TRX-20260801-002",
      customer: {name: "Siti Aisyah", email: "siti.aisyah@email.com",},
      amount: 750000,
      method: "E-Wallet",
      bank: null,
      type: "Withdrawal",
      status: "PENDING",
      createdAt: "2026-08-01 10:22:41",
      processedAt: null,
      approvedBy: null,
      reference: "EW-123812",
   }, {
      id: "TRX-20260801-003",
      customer: {name: "Budi Santoso", email: "budi.santoso@email.com",},
      amount: 2500000,
      method: "Bank Transfer",
      bank: "Mandiri",
      type: "Deposit",
      status: "FAILED",
      createdAt: "2026-08-01 11:03:12",
      processedAt: "2026-08-01 11:04:01",
      approvedBy: null,
      reference: "MDR-551920",
   }, {
      id: "TRX-20260802-004",
      customer: {name: "Citra Lestari", email: "citra.lestari@email.com",},
      amount: 450000,
      method: "E-Wallet",
      bank: null,
      type: "Withdrawal",
      status: "SUCCESS",
      createdAt: "2026-08-02 08:45:19",
      processedAt: "2026-08-02 08:46:33",
      approvedBy: "Admin Operations",
      reference: "EW-992381",
   }, {
      id: "TRX-20260802-005",
      customer: {name: "Dimas Saputra", email: "dimas.saputra@email.com",},
      amount: 3200000,
      method: "Bank Transfer",
      bank: "BRI",
      type: "Deposit",
      status: "PENDING",
      createdAt: "2026-08-02 13:12:44",
      processedAt: null,
      approvedBy: null,
      reference: "BRI-721991",
   }, {
      id: "TRX-20260803-006",
      customer: {name: "Nabila Putri", email: "nabila.putri@email.com",},
      amount: 980000,
      method: "Bank Transfer",
      bank: "BCA",
      type: "Withdrawal",
      status: "FAILED",
      createdAt: "2026-08-03 14:27:11",
      processedAt: "2026-08-03 14:28:10",
      approvedBy: "Admin Finance",
      reference: "BCA-228811",
   }, {
      id: "TRX-20260803-007",
      customer: {name: "Fajar Ramadhan", email: "fajar.ramadhan@email.com",},
      amount: 1750000,
      method: "E-Wallet",
      bank: null,
      type: "Deposit",
      status: "SUCCESS",
      createdAt: "2026-08-03 15:42:18",
      processedAt: "2026-08-03 15:43:01",
      approvedBy: "Admin Finance",
      reference: "EW-772901",
   }, {
      id: "TRX-20260804-008",
      customer: {name: "Aulia Rahma", email: "aulia.rahma@email.com",},
      amount: 600000,
      method: "Bank Transfer",
      bank: "BNI",
      type: "Withdrawal",
      status: "PENDING",
      createdAt: "2026-08-04 09:18:32",
      processedAt: null,
      approvedBy: null,
      reference: "BNI-661290",
   }, {
      id: "TRX-20260804-009",
      customer: {name: "Rizky Maulana", email: "rizky.maulana@email.com",},
      amount: 4100000,
      method: "Bank Transfer",
      bank: "Mandiri",
      type: "Deposit",
      status: "SUCCESS",
      createdAt: "2026-08-04 16:21:09",
      processedAt: "2026-08-04 16:22:45",
      approvedBy: "Admin Finance",
      reference: "MDR-883921",
   }, {
      id: "TRX-20260805-010",
      customer: {name: "Intan Permata", email: "intan.permata@email.com",},
      amount: 850000,
      method: "E-Wallet",
      bank: null,
      type: "Withdrawal",
      status: "FAILED",
      createdAt: "2026-08-05 10:31:55",
      processedAt: "2026-08-05 10:32:27",
      approvedBy: null,
      reference: "EW-119283",
   },];
