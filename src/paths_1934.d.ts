export namespace v2.auth.post {
    export interface response200 {
        token?: string
        expired?: string
    }
}

export namespace auth.post {
    export interface response200 {
        token?: string
        expired?: string
    }
}

export namespace accounts._accountId_.companies.get {
    export type response200 =
        AccountCompany[]
}

export namespace addresses._zipcode_.get {
    export type response200 =
        Address[]
}

export namespace agasts.get {
    export type response200 =
        {
            description?: string
            id?: string
            code?: string
        }[]
}

export namespace agasts._code_.get {
    export type response200 =
        Agast
}

export namespace calculations_goods.post {
    export type response200 =
        TransactionForGoodsOut
}

export namespace calculations_service_sales.post {
    export type response200 =
        SalesTransactionOut
}

export namespace calculations_service_purchase.post {
    export type response200 =
        PurchaseTransactionOut
}

export namespace calculations_service_payment.post {
    export type response200 =
        PaymentTransactionOut
}

export namespace calculations_service_receipt.post {
    export type response200 =
        ReceiptTransactionOut
}

export namespace calculations.goods._transactionType_.get {
    export type response200 =
        TransactionForGoodsIn[]
}

export namespace calculations.goods._transactionType_._documentCode_.get {
    export type response200 =
        TransactionForGoodsIn
}

export namespace companies.get {
    export type response200 =
        Company[]
}

export namespace companies.post {
    export type response200 =
        Company
}

export namespace companies._companyId_.get {
    export type response200 =
        Company
}

export namespace companies._companyId_.locations.get {
    export type response200 =
        Location[]
}

export namespace companies._companyId_.locations._code_.get {
    export type response200 =
        Location
}

export namespace companies._companyId_.agasts.get {
    export type response200 =
        {
            description?: string
            id?: string
            code?: string
        }[]
}

export namespace companies._companyId_.agasts._code_.get {
    export type response200 =
        CustomAgast
}

export namespace companies._companyId_.taxrates.get {
    export type response200 =
        CustomTaxTypeRate[]
}

export namespace companies._companyId_.taxrates._taxType_.get {
    export type response200 =
        CustomTaxTypeRate
}

export namespace companies._companyId_.items_goods.get {
    export type response200 =
        ItemGoods[]
}

export namespace companies._companyId_.items._code_goods.get {
    export type response200 =
        ItemGoods
}

export namespace companies._companyId_.items_service.get {
    export type response200 =
        ItemSimple[]
}

export namespace companies._companyId_.items._code_service.get {
    export type response200 =
        ItemSimple
}

export namespace companies._companyId_.items._code_.cpom.get {
    export type response200 =
        ItemCpom[]
}

export namespace companies._companyId_.items._code_.cpom._cityCode_.get {
    export type response200 =
        ItemCpom
}

export namespace companies._companyId_.icms.get {
    export type response200 =
        CustomIcmsConfByState[]
}

export namespace companies._companyId_.icms._state_.get {
    export type response200 =
        CustomIcmsConfByState
}

export namespace companies._companyId_.process.get {
    export type response200 =
        CustomProcessScenario[]
}

export namespace companies._companyId_.process._code_.get {
    export type response200 =
        CustomProcessScenario
}

export namespace companies._companyId_.certificate.post {
    export interface response200
    { companyId?: string }
}

export namespace companies._companyId_.certificate.put {
    export interface response200
    { companyId?: string }
}

export namespace invoices.nfe._key_.get {
    export type response200 = 

 }

export namespace invoices.nfce._key_.get {
    export type response200 = 

 }

export namespace invoices.sefaz.post {
    export type response200 =
        SefazPostOut
}

export namespace invoices.sefaz.delete {
    export type response200    =
    SefazInvoiceBasicStatus
}

export namespace invoices.sefaz._key_.get {
    export type response200 =
        SefazItGetOut
}

export namespace invoices.sefaz._key_.put {
    export type response200 =
        SefazInvoiceBasicStatus
}

export namespace invoices.sefaz._key_.delete {
    export type response200    =
    SefazInvoiceBasicStatus
}

export namespace invoices.sefaz._key_.lookup.get {
    export type response200 =
        TransactionForSefazGoodsList
}

export namespace invoices.sefaz.status.get {
    export type response200 =
        string
}

export namespace invoices.service.post {
    export type response200 =
        AbrasfPostOut
}

export namespace invoices.service._key_.get {
    export type response200 =
        AbrasfItGetOut
}

export namespace invoices.contingency._state_.get {
    export interface response200 {
        contingency?: boolean
        startDate?: string
        finishDate?: string
    }
}

export namespace invoices.settings.get {
    export interface response200
    { environment?: '1' | '2' }
}

export namespace taxconf.iss.get {
    export type response200 =
        IssConfByCity[]
}

export namespace taxconf.iss._cityCode_.get {
    export type response200 =
        IssConfByCity[]
}

export namespace taxconf.icms._state_.get {
    export type response200 =
        IcmsConfByState[]
}

export namespace taxconf.icms._state_._code_.get {
    export type response200 =
        IcmsConfByState[]
}

export namespace taxconf.icms_search.get {
    export type response200 =
        IcmsConfByState[]
}

export namespace taxconf.cfop.get {
    export type response200 =
        CfopConf[]
}

export namespace taxconf.cfop._code_.get {
    export type response200 =
        CfopConf
}

export namespace taxconf.process.get {
    export type response200 =
        ProcessScenario[]
}

export namespace taxconf.process._code_.get {
    export type response200 =
        ProcessScenario
}

export namespace taxconf.legal_reason.get {
    export type response200 =
        LegalReason[]
}

export namespace taxconf.legal_reason._uuid_.get {
    export type response200 =
        LegalReason
}

export namespace transactions_goods.post {
    export type response200 =
        TransactionForGoodsOut
}

export namespace transactions_service_sales.post {
    export type response200 =
        SalesTransactionOut
}

export namespace transactions_service_purchase.post {
    export type response200 =
        PurchaseTransactionOut
}

export namespace transactions_service_payment.post {
    export type response200 =
        PaymentTransactionOut
}

export namespace transactions_service_receipt.post {
    export type response200 =
        ReceiptTransactionOut
}

