export interface InformerForGoods {
    header?: HeaderForGoods
    line?: LineForGoods
    _company?: EntityInformerForGoods
    _entity?: EntityInformerForGoods
    emitter?: EntityInformerForGoods
    receiver?: EntityInformerForGoods
    transporter?: EntityInformerForGoods
    csts?: {
        icms?: string
        ipi?: string
        pisCofins?: string
    }
    amount?: number
    discount?: number
    quantity?: number
    unitPrice?: number
    freightAmount?: number
    insuranceAmount?: number
    otherCostAmount?: number
    exemptValue?: number
}

export interface EntityInformerForGoods {
    type?: EntityType
    taxRegime?: FederalTaxRegime
    federalTaxRegime?: {
        code?: string
        name?: string
        abbr?: string
    }
    cityCode?: string
    address?: Address
    details?: {
    }
    icmsTaxPayer?: boolean
}

export interface HeaderForGoods {
    messageType: 'goods'
    documentCode?: string
    participants: {
        entity?: EntityForGoods
        transporter?: EntityForGoods
    }
    nfAccessKey?: string
    nfceQrCode?: string
    transactionType: 'Sale' | 'Purchase' | 'SalesReturn' | 'PurchaseReturn' |
    'TransferReturn' | 'Shipping' | 'ShippingReturn' |
    'Transfer' | 'ReceiptAdjustment' | 'TransferAdjustment'
    transactionModel?: '01' | '1B' | '02' | '2D' | '2E' | '04' | '06' | '07' | '08' |
    '8B' | '09' | '10' | '11' | '13' | '14' | '15' | '16' | '18' |
    '21' | '22' | '26' | '27' | '28' | '29' | '55' | '57' | '59' |
    '60' | '65'
    transactionClass?: string
    eDocCreatorType: 'self' | 'other'
    eDocCreatorPerspective?: boolean
    currency?: string
    companyLocation: string
    transactionDate?: string
    shippingDate?: string
    additionalInfo?: AdditionalInformation
    tpImp?: '0' | '1' | '2' | '3' | '4' | '5'
    idDest?: 0 | 1 | 2 | 3
    indPres?: '0' | '1' | '2' | '3' | '4' | '9'
    invoiceNumber?: number
    invoiceSerial?: number
    defaultLocations?: DefaultLocations
    transport?: Transport
    nfRef?: NRef[]
    payment?: Payment
    purchaseInfo?: PurchaseInfo
    export?: ExportInfo
}

export interface LineForGoods {
    lineCode: number
    itemCode: string
    avalaraGoodsAndServicesType?: string
    numberOfItems: number
    returnedPercentageAmount?: number
    lineUnitPrice?: number
    lineAmount: number
    itemDescription: string
    lineTaxedDiscount?: number
    lineUntaxedDiscount?: number
    useType: 'use or consumption' | 'resale' | 'agricultural production' |
    'production' | 'use or consumption on business establishment' |
    'use or consumption on transporter service establishment' |
    'use or consumption on communication service establishment' |
    'use or consumption on demand by contract' |
    'use or consumption on energy supplier establishment' |
    'use or consumption of fuel transaction type exportation' |
    'fixed assets' | 'resale export' | 'resale icms exempt' |
    'resale buyer under the same icmsSt tax rule' |
    'transport of goods that don\'t need invoice (nf)'
    processScenario: string
    cfop?: number
    hasStockImpact?: boolean
    hasFinantialImpact?: boolean
    freightAmount?: number
    insuranceAmount?: number
    otherCostAmount?: number
    indTotType?: boolean
    orderNumber?: string
    orderItemNumber?: string
    fciNumber?: string
    recopiNumber?: string
    infAdProd?: string
    vehicle?: Vehicle
    medicine?: Medicine
    weapon?: Weapon
    fuel?: Fuel
    entityIsIcmsSubstitute?: boolean
    isTransportIcmsWithheld?: boolean
    icmsTaxRelief?: {
        reasonCode: '1' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' |
        '12' | '16'
        taxBaseDiscount?: number
        taxAmount?: number
    }
    export?: {
        drawbackNumber?: string
        indExport?: {
            registerNumber: string
            accessKey: string
            quantity: number
        }
    }[]
    di?: {
        customsValue?: number
        diNumber: string
        registerDateDI: string
        clearanceSite: string
        clearanceState: StateEnum
        clearanceDate?: string
        transportDIType: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
        afrmmValue?: number
        intermediateType: '1' | '2' | '3'
        buyerFederalTaxID?: string
        buyerState?: StateEnum
        exporterCode?: string
        adi: {
            addNumber: number
            sequentialNumber: number
            manufacturerCode: string
            adiDiscount?: number
            drawbackNumber?: string
        }[]
    }[]
    calculatedTax?: {
        taxByType?: {
            icms?: TaxByTypeTax
            icmsSt?: TaxByTypeTax
            icmsStSd?: TaxByTypeTax
            icmsPartOwn?: TaxByTypeTax
            icmsPartDest?: TaxByTypeTax
            icmsDifaFCP?: TaxByTypeTax
            icmsDifaDest?: TaxByTypeTax
            icmsDifaRemet?: TaxByTypeTax
            icmsRf?: TaxByTypeTax
            icmsDeson?: TaxByTypeTax
            icmsCredsn?: TaxByTypeTax
            pis?: TaxByTypeTax
            pisSt?: TaxByTypeTax
            cofins?: TaxByTypeTax
            cofinsSt?: TaxByTypeTax
            ipi?: TaxByTypeTax
            ipiReturned?: {
                calcBase?: number
            }
            ii?: TaxByTypeTax
            iof?: TaxByTypeTax
            aproxtribState?: TaxByTypeTax
            aproxtribFed?: TaxByTypeTax
        }
        tax?: number
        details?: DetailsCalculatedTaxItem[]
    }
}

export interface Address {
    street?: string
    neighborhood?: string
    zipcode?: string
    cityCode?: string
    cityName?: string
    state?: StateEnum
    countryCode?: string
    country?: string
    number?: string
    complement?: string
    phone?: string
}

export type EntityType =
    'business' | 'individual' | 'federalGovernment' |
    'stateGovernment' | 'cityGovernment' | 'foreign'

export type FederalTaxRegime =
    'realProfit' | 'estimatedProfit' | 'simplified' |
    'simplifiedOverGrossthreshold' | 'simplifiedEntrepreneur' |
    'notApplicable' | 'individual'

export type StateEnum =
    'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' |
    'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' |
    'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO'

export interface EntityForGoods extends Entity {
    icmsTaxPayer?: boolean
}

export interface NRef {
    type?: 'refNFe' | 'refCTE' | 'refECF' | 'refNF' | 'refFarmerNF'
    refNFe?: string
    refCTe?: string
    refECF?: {
        nECF: string
        nCOO: string
        modECF: '2B' | '2C' | '2D'
    }
    refNF?: {
        stateCd: StateEnum
        yymm: string
        federalTaxId: string
        serie: string
        number: string
    }
    refFarmerNF?: {
        stateCd: StateEnum
        yymm: string
        federalTaxId: string
        stateTaxId: string
        model: '04' | '01'
        serie: string
        number: string
    }
}

export interface Payment {
    installmentsTerms?: 0 | 1 | 2
    bill?: {
        nFat?: string
        vOrig?: number
        vDiscount?: number
        vNet?: number
    }
    installment?: {
        documentNumber?: string
        date?: string
        grossValue: number
    }[]
    paymentMode?: {
        mode: '01' | '02' | '03' | '04' | '05' | '10' | '11' | '12' | '13' |
        '99'
        value: number
        cardTpIntegration?: '1' | '2'
        cardCNPJ?: string
        cardBrand?: '01' | '02' | '03' | '04' | '99'
        cardAuthorization?: string
    }[]
}

export interface PurchaseInfo {
    governmentOrder?: string
    orderNumber?: string
    contractNumber?: string
}

export interface ExportInfo {
    shippingState: StateEnum
    place: string
    placeDescription?: string
}

export interface DefaultLocations {
    entity?: EntityLocation
    company?: EntityLocation
    transporter?: EntityLocation
    deliveryLocation?: EntityLocation
    pickupLocation?: EntityLocation
}

export interface Transport {
    modFreight: 'CIF' | 'FOB' | 'Thridparty' | 'FreeShipping'
    withholdICMSTransport?: boolean
    volumes?: {
        qVol?: string
        specie?: string
        brand?: string
        volumeNumeration?: string
        netWeight?: number
        grossWeight?: number
        seal?: string[]
    }[]
    vehicle?: VehicleTransp
}

export interface AdditionalInformation {
    fiscalInfo?: string
    complementaryInfo?: string
    procRef?: {
        nProc?: string
        indProc?: '0' | '1' | '2' | '3' | '9'
    }[]
}

export interface Entity {
    name?: string
    role?: 'transporter' | 'sender' | 'dispatcher' | 'receiver' |
    'addressee' | 'other'
    type: EntityType
    federalTaxId: string
    cityTaxId?: string
    stateTaxId?: string
    suframa?: string
    phone?: string
    taxRegime?: 'realProfit' | 'estimatedProfit' | 'simplified' |
    'simplifiedOverGrossthreshold' | 'simplifiedEntrepreneur' |
    'notApplicable' | 'individual'
    email?: string
    subjectToSRF1234?: boolean
    subjectToPayrollExemption?: boolean
}

export interface EntityLocation {
    street?: string
    neighborhood?: string
    zipcode?: string
    cityCode?: string
    cityName?: string
    state?: StateEnum
    countryCode?: string
    country?: string
    number?: string
    complement?: string
    phone?: string
}

export interface VehicleTransp {
    type?: 'automobile' | 'wagon' | 'ferry' | 'trailer'
    automobile?: VehicleID
    trailer?: VehicleID[]
    wagon?: string
    ferry?: string
}

export interface VehicleID {
    licensePlate: string
    stateCode: StateEnum
    rtnc?: string
}

export interface DetailsCalculatedTaxItem extends DetailsCalculatedTax {
    source?: CSTTableAEnum
    cstB?: CSTTableBEnum
    cst?: string
    modBC?: string
    pMVA?: number
    pRedBC?: number
    pBCOp?: number
    ufst?: StateEnum
    calcMode?: CalcModelEnum
    legalTaxClass?: number
    legalTaxClassDC?: number
    cnpjProd?: string
    sealCode?: string
    sealQuantity?: string
    icmsInterPartRate?: number
    icmsSesonReason?: ICMSSesonReason
    perQuantityReturned?: number
}

export interface TaxByTypeTax
{ tax: number }

export interface Vehicle {
    tpOp: 1 | 2 | 3 | 0
    chassisNumber: string
    colorCode: string
    colorName: string
    cvPower: string
    cylinderVolumCC: string
    netWeight: string
    grossWeight: string
    serialNumber: string
    fuelType: '01' | '02' | '03' | '16' | '17' | '18'
    engineNumber: string
    cmt: string
    lengthBetweenAxis: string
    modelYear: string
    manufactoryYear: string
    paintType: string
    vehicleRENAVAMType: string
    specieRENAVAMType: string
    modelRENAVAMCode: string
    colorDENATRANCode: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' |
    '10' | '11' | '12' | '13' | '14' | '15' | '16'
    vin: 'R' | 'N'
    vehicleManufactoryStatus: '1' | '2' | '3'
    maxOccupantsQuantity: string
    restrictionType: '0' | '1' | '2' | '3' | '4' | '9'
}

export interface Medicine {
    loteNumber: string
    loteQuantity: number
    manufactotyDate: string
    expirationDate: string
    maxValueToEndUser: number
}

export interface Weapon {
    weaponRestrictionType: '0' | '1'
    serieNumber: string
    gunBarrelSerieNumber: string
    weaponDescription: string
}

export interface Fuel {
    prodANPCode: string
    perMixGN?: number
    authorizationCodeCODIF?: string
    quantityOnRoomTemperature?: number
    stateCodeOfUndUser: StateEnum
    cide?: {
        baseCalcCIDE: number
        rateCIDE: number
        valueCIDE: number
    }
    pumpNumber?: {
        nozzleNumberFuelSupply: string
        fuelPumpNumber: string
        fuelTankNumber: string
        startValueOfPumpNumber: number
        endValueOfPumpNumber: number
    }
}

export interface DetailsCalculatedTax {
    locationType?: string
    jurisdictionName?: string
    jurisdictionType?: 'City' | 'State' | 'Country'
    taxType?: 'icms' | 'icmsSt' | 'icmsStSd' | 'icmsPartOwn' |
    'icmsPartDest' | 'icmsDifaFCP' | 'icmsDifaDest' |
    'icmsDifaRemet' | 'icmsRf' | 'icmsDeson' | 'icmsCredsn' |
    'pis' | 'pisSt' | 'cofins' | 'cofinsSt' | 'ipi' | 'ipiReturned' |
    'ii' | 'iof' | 'aproxtribState' | 'aproxtribFed' |
    'aproxtrib'
    rateType?: string
    scenario?: string
    subtotalTaxable?: number
    rate?: number
    tax?: number
    exemptionCode?: string
    significantLocations?: string[]
    taxRuleType?: 'SELLER' | 'BUYER' | 'TRANSACTION' | 'ITEM' | 'TAX'
}

export type CalcModelEnum =
    'rate' | 'quantity'

export type CSTPistCofinsEnum =
    '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' |
    '49' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '60' |
    '61' | '62' | '63' | '64' | '65' | '66' | '67' | '70' | '71' |
    '72' | '73' | '74' | '75' | '98' | '99'

export type CSTTableAEnum =
    '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

export type CSTTableBEnum =
    '00' | '10' | '20' | '30' | '40' | '41' | '50' | '51' | '60' |
    '70' | '90'

export type ICMSSesonReason =
    '0' | '1' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' |
    '11'

export interface AccountCompany {
    companyId: string
    companyCode: string
    companyName?: string
}

export interface Company {
    code: string
    officialName: string
    name: string
    entityType: EntityType
    subjectToSRF1234?: boolean
    federalTaxRegime: FederalTaxRegime
    pisSubjectTo?: 'TAXABLE' | 'NOT TAXABLE' | 'EXEMPT'
    cofinsSubjectTo?: 'TAXABLE' | 'NOT TAXABLE' | 'EXEMPT'
    csllSubjectTo?: 'TAXABLE' | 'NOT TAXABLE' | 'EXEMPT'
    receiptsAreFullNoCumulativePisCofins?: boolean
    inssWithholdSubjectTo?: boolean
    issWithholdSubjectTo?: boolean
    irrfWithholdSubjectTo?: boolean
    icmsRateForSimplestaxregime?: number
    isExemptByGrossRevenueForSimplestaxregime?: boolean
    subjectToPayrollExemption?: boolean
    configuration?: {
        certificate?: string
        certificatepwd?: string
        certificateexpiration?: string
        logo?: string
        tpImpNFe?: '0' | '1' | '2'
        tpImpNFCe?: '0' | '4' | '5'
    }
    mailServer?: {
        user?: string
        password?: string
        smtpAddress?: string
        port?: number
        emailFrom?: string
        protocol?: 'ssl' | 'tls'
        templatemessageToEmail?: string
    }
    authorizedToDownloadNFe?: { federalTaxId?: string }[]
}

export interface ValidationError {
    message?: string
    errors?: Error[]
}

export interface Error {
    code?: number
    message: string
    field?: string
    value?: string
    in?: 'params' | 'body' | 'query'
}

export interface Message
{ message?: string }

export interface Agast {
    code: string
    description?: string
    hsCode?: string
    ex?: number
    cest?: string
    cean?: string
    codeType?: {
        code?: 0 | 1 | 2 | 3
        name?: 'NCM' | 'NBS' | 'LC116' | 'SERVICE UNREGULATED'
    }
    cstIPI?: 'T' | 'Z' | 'E' | 'N' | 'I'
    ipiLegalTaxClass?: string
    pisCofinsTaxReporting?: 'cumulative' | 'noCumulative'
    accruablePISTaxation?: 'T' | 'Z' | 'E' | 'H' | 'N'
    pisExemptLegalReasonCode?: string
    pisExemptLegalReason?: string
    accruableCOFINSTaxation?: 'T' | 'Z' | 'E' | 'H' | 'N'
    cofinsExemptLegalReasonCode?: string
    cofinsExemptLegalReason?: string
    accruableCSLLTaxation?: 'T' | 'E'
    csllExemptLegalReason?: string
    csllExemptLegalReasonCode?: string
    withholding?: {
        IRRF?: boolean
        IRRFLegalReason?: string
        INSSSubjectToDischarge?: boolean
        INSS?: boolean
        INSSLegalReason?: string
        INSsForSimples?: boolean
        INSSForSimplesLegalReason?: string
        PIS?: {
            legalReason?: string
            business?: boolean
            businessLegalReason?: string
            federalGovernment?: boolean
            federalGovernmentLegalReason?: string
            stateGovernment?: boolean
            stateGovernmentLegalReason?: string
            cityGovernment?: boolean
            cityGovernmentLegalReason?: string
        }
        COFINS?: {
            legalReason?: string
            business?: boolean
            businessLegalReason?: string
            federalGovernment?: boolean
            federalGovernmentLegalReason?: string
            stateGovernment?: boolean
            stateGovernmentLegalReason?: string
            cityGovernment?: boolean
            cityGovernmentLegalReason?: string
        }
        CSLL?: {
            legalReason?: string
            business?: boolean
            businessLegalReason?: string
            federalGovernment?: boolean
            federalGovernmentLegalReason?: string
            stateGovernment?: boolean
            stateGovernmentLegalReason?: string
            cityGovernment?: boolean
            cityGovernmentLegalReason?: string
        }
    }
    issDueatDestination?: boolean
    pisCofinsCreditNotAllowed?: boolean
    issTaxation?: 'T' | 'E' | 'F' | 'A' | 'L' | 'I'
    federalTaxRate?: TaxTypeRate[]
    specialProductClass?: 'OTHERS' | 'COMMUNICATION' | 'ENERGY' | 'TRANSPORT' |
    'FUEL AND LUBRICANT' | 'VEHICLE' | 'ALCOHOLIC BEVERAGES' |
    'WEAPONS' | 'AMMO' | 'PERFUME' | 'TOBACCO'
    icmsConf?: {
        code?: string
        state?: StateEnum
    }[]
    subjectToPayrollExemption?: boolean
}

export interface TaxTypeRate {
    taxType: TaxType
    taxModel: 'rate' | 'srf'
    rate?: number
    srvAmount?: number
    quantityUnidBase?: string
    specializationType?: 'basic' | 'monophase' | 'taxSubstitution'
}

export type TaxType =
    'INSS' | 'INSS_RF' | 'INSS_AR' | 'IRRF' | 'PIS' | 'PIS_RF' |
    'PIS_RP' | 'PIS_PP' | 'COFINS' | 'COFINS_RF' | 'COFINS_RP' |
    'COFINS_PP' | 'CSLL' | 'CSLL_RF' | 'CSLL_PP' | 'CSLL_RP' |
    'IRPJ' | 'ISS' | 'ISS_RF' | 'IPI'

export interface LegalReason {
    id?: string
    scope: 'general' | 'linkedTo'
    disable?: boolean
    description: string
    name: string
    legalCode?: string
    showInInvoice?: 'complementaryInfoMessage' | 'fiscalInfoMessage' |
    'itemInfoMessage' | 'no show'
    referencedProcesses?: {
        nProc?: string
        indProc?: '0' | '1' | '2' | '3' | '9'
    }[]
    taxConstraint?: {
        taxType?: 'NONE' | 'INSS' | 'IRRF' | 'IRPJ' | 'PIS' | 'COFINS' |
        'CSLL' | 'IPI' | 'ICMS' | 'II' | 'IOF' | 'ISS' | 'APROXTOTALTAX'
        specializedTaxType?: 'icms' | 'icmsSt' | 'icmsStSd' | 'icmsPartOwn' |
        'icmsPartDest' | 'icmsDifaFCP' | 'icmsDifaDest' |
        'icmsDifaRemet' | 'icmsRf' | 'icmsDeson' | 'icmsCredsn' |
        'pis' | 'pisSt' | 'cofins' | 'cofinsSt' | 'ipi' | 'ipiReturned' |
        'ii' | 'iof'
        jurisdictionType?: 'NONE' | 'City' | 'State' | 'Country'
        jurisdictionIbgeCode?: string
        precondition?: string
    }
}

export interface TransactionForGoodsIn {
    header: HeaderForGoods
    lines: LineForGoods[]
}

export interface TransactionForGoodsOut {
    header: HeaderForGoods
    lines: LineForGoods[]
    calculatedTaxSummary: CalculatedTaxSummaryForGoods
    processingInfo: ProcessingInfo
}

export interface SalesTransactionOut {
    header: SalesHeaderOut
    lines: SalesLinesOut[]
    calculatedTaxSummary: SalesCalculatedTaxSummaryForService
    processingInfo: ProcessingInfo
}

export interface SalesTransactionIn {
    header: SalesHeaderIn
    lines: SalesLinesIn[]
}

export interface PurchaseTransactionOut {
    header: PurchaseHeaderOut
    lines: PurchaseLinesOut[]
    calculatedTaxSummary: PurchaseCalculatedTaxSummaryForService
    processingInfo: ProcessingInfo
}

export interface PurchaseTransactionIn {
    header: PurchaseHeaderIn
    lines: PurchaseLinesIn[]
}

export interface PaymentTransactionOut {
    header?: PayRecHeader
    lines?: PayRecLinesOut[]
    calculatedTaxSummary?: PayRecCalculatedTaxSummaryForService
    processingInfo?: ProcessingInfo
}

export interface PaymentTransactionIn {
    header?: PayRecHeader
    lines?: PaymentLinesIn[]
}

export interface ReceiptTransactionOut {
    header: PayRecHeader
    lines: PayRecLinesOut[]
    calculatedTaxSummary: PayRecCalculatedTaxSummaryForService
    processingInfo: ProcessingInfo
}

export interface ReceiptTransactionIn {
    header: PayRecHeader
    lines: PaymentLinesIn[]
}

export interface CalculatedTaxSummaryForGoods {
    numberOfLines?: number
    taxedDiscount?: number
    untaxedDiscount?: number
    subtotal?: number
    totalTax?: number
    grandTotal?: number
    taxByType?: {
        icms?: TaxByTypeSummaryForGoods
        icmsSt?: TaxByTypeSummaryForGoods
        icmsStSd?: TaxByTypeSummaryForGoods
        icmsPartOwn?: TaxByTypeSummaryForGoods
        icmsPartDest?: TaxByTypeSummaryForGoods
        icmsDifaFCP?: TaxByTypeSummaryForGoods
        icmsDifaDest?: TaxByTypeSummaryForGoods
        icmsDifaRemet?: TaxByTypeSummaryForGoods
        icmsRf?: TaxByTypeSummaryForGoods
        icmsDeson?: TaxByTypeSummaryForGoods
        icmsCredsn?: TaxByTypeSummaryForGoods
        pis?: TaxByTypeSummaryForGoods
        pisSt?: TaxByTypeSummaryForGoods
        cofins?: TaxByTypeSummaryForGoods
        cofinsSt?: TaxByTypeSummaryForGoods
        ipi?: TaxByTypeSummaryForGoods
        ipiReturned?: TaxByTypeSummaryForGoods
        ii?: TaxByTypeSummaryForGoods
        iof?: TaxByTypeSummaryForGoods
        aproxtribState?: TaxByTypeSummaryForGoods
        aproxtribFed?: TaxByTypeSummaryForGoods
    }
}

export interface ProcessingInfo {
    versionId?: string
    duration?: number
}

export interface TaxByTypeSummaryForGoods {
    calcbase?: number
    tax?: number
    jurisdictions?: TaxByTypeSummaryJurisdictionForGoods[]
}

export interface TaxByTypeSummaryJurisdictionForGoods {
    jurisdictionName?: string
    jurisdictionType?: 'City' | 'State' | 'Country'
    tax?: number
}

export interface SalesHeaderOut extends SalesHeaderIn {
    discriminationOut?: string
    xml?: string
    ediSyncState?: 'STORED' | 'WAITING APPROVAL' | 'AUTHORIZED' |
    'AUTHORIZED with NOTE' | 'ERROR' | 'CANCELED REPLACED' |
    'CANCELED' | 'CANCELLATION REQUESTED'
    payment?: {
        terms?: PaymentTerms
        withholdingMode?: WithholdingMode
        installments?: InstallmentComplete[]
    }
}

export interface SalesLinesOut extends SalesLinesIn {
    avalaraGoodsAndServicesType?: string
    lineNetValue?: number
    cst?: '01' | '02' | '03' | '04' | '05' | '21' | '22' | '23' | '24' |
    '25' | '40'
    cstRf?: '61' | '62' | '63' | '64' | '65' | '66' | '67' | '68' | '69' |
    '70' | '71' | '72'
    taxDeductions?: { iss?: number }
    calculatedTax?: SalesCalculatedTax
}

export interface SalesCalculatedTaxSummaryForService {
    numberOfLines?: number
    subtotal?: number
    totalTax?: number
    grandTotal?: number
    taxByType: {
        pisRf?: TaxByTypeSummaryForService
        cofinsRf?: TaxByTypeSummaryForService
        csllRf?: TaxByTypeSummaryForService
        irrf?: TaxByTypeSummaryForService
        inssRf?: TaxByTypeSummaryForService
        pis?: TaxByTypeSummaryForService
        cofins?: TaxByTypeSummaryForService
        csll?: TaxByTypeSummaryForService
        issRf?: TaxByTypeSummaryForService
        iss?: TaxByTypeSummaryForService
        aproxtribCity?: TaxByTypeSummaryForService
        aproxtribFed?: TaxByTypeSummaryForService
        irpj?: TaxByTypeSummaryForService
        inss?: TaxByTypeSummaryForService
    }
}

export interface InstallmentComplete {
    documentNumber: string
    date: string
    grossValue: number
    netValue?: number
    withholdingMode?: WithholdingMode
    withholdingPIS?: number
    withholdingCOFINS?: number
    withholdingCSLL?: number
}

export type PaymentTerms =
    0 | 1

export interface SalesHeaderIn extends HeaderBaseInfo {
    purchaseOrderNumber?: string
    rpsNumber?: number
    rpsSerie?: string
    discriminationIn?: string
    entity?: SalesEntity
    payment?: {
        terms?: PaymentTerms
        installments?: SalesInstallmentIn[]
    }
    taxesConfig?: SalesTaxesConfig
    defaultLocations?: SalesDefaultLocations
}

export type WithholdingMode =
    'xxx' | 'PCC' | 'PCx' | 'PxC' | 'Pxx' | 'xCC' | 'xxC' |
    'xCx'

export interface HeaderBaseInfo {
    transactionType: 'Sale' | 'Purchase' | 'Payment' | 'Receipt'
    documentCode?: string
    currency?: string
    transactionDate: string
    taxCalculationDate?: string
    companyLocation: string
}

export interface SalesEntity {
    name?: string
    type: EntityType
    email?: string
    cnpjcpf?: string
    cityTaxId?: string
    stateTaxId?: string
    suframa?: string
    phone?: string
    taxRegime: FederalTaxRegime
    specialTaxRegime?: 'MEM' | 'EST' | 'SPR' | 'COP' | 'MEI' | 'MPP'
    subjectToSRF1234?: boolean
    requiredWithholdingISS?: boolean
    art?: string
    adminProcess?: string
    buildCode?: string
}

export interface SalesInstallmentIn {
    documentNumber: string
    date: string
    grossValue: number
}

export interface SalesTaxesConfig {
    accruableCOFINSTaxation?: 'T' | 'N' | 'Z' | 'E' | 'H' | 'S'
    accruableCSLLTaxation?: 'T' | 'E'
    accruablePISTaxation?: 'T' | 'N' | 'Z' | 'E' | 'H' | 'S'
    accruableCOFINSExempCodeTaxation?: string
    accruablePISExempCodeTaxation?: string
    withholdingCOFINS?: boolean
    withholdingCSLL?: boolean
    withholdingIRRF?: boolean
    withholdingPIS?: boolean
    withholdIRRFExemptReasonTaxation?: string
}

export interface SalesDefaultLocations
{ serviceRendered?: ServiceRendered }

export interface ServiceRendered
{ address?: SimpleAddress }

export interface SimpleAddress {
    line1?: string
    line2?: string
    line3?: string
    city?: string
    zipcode?: string
    state?: StateEnum
    country?: string
}

export interface SalesCalculatedTax {
    taxByType?: SalesTaxByType
    tax?: number
    details?: SalesTaxByTypeDetail[]
}

export interface SalesLinesIn {
    lineCode?: number
    itemCode: string
    numberOfItems?: number
    lineAmount?: number
    itemDescription?: string
    lineTaxedDiscount?: number
    lineUntaxedDiscount?: number
    taxDeductions?: { iss?: number }
}

export interface SalesTaxByType {
    pisRf?: TaxByTypeTax
    cofinsRf?: TaxByTypeTax
    csllRf?: TaxByTypeTax
    irrf?: TaxByTypeTax
    inssRf?: TaxByTypeTax
    pis?: TaxByTypeTax
    cofins?: TaxByTypeTax
    csll?: TaxByTypeTax
    issRf?: TaxByTypeTax
    iss?: TaxByTypeTax
    aproxtribCity?: TaxByTypeTax
    aproxtribFed?: TaxByTypeTax
    irpj?: TaxByTypeTax
    inss?: TaxByTypeTax
}

export interface SalesTaxByTypeDetail {
    locationType?: string
    jurisdictionName?: string
    jurisdictionType?: 'City' | 'State' | 'Country'
    taxType?: 'aproxtribCity' | 'aproxtribFed' | 'pis' | 'pisRf' |
    'cofins' | 'cofinsRf' | 'csll' | 'csllRf' | 'irrf' |
    'inss' | 'inssRf' | 'iss' | 'issRf' | 'irpj'
    rateType?: string
    scenario?: string
    subtotalTaxable?: number
    rate?: number
    tax?: number
    exemptionCode?: string
    significantLocations?: string[]
    taxRuleType?: 'SELLER' | 'BUYER' | 'TRANSACTION' | 'ITEM' | 'TAX'
}

export interface TaxByTypeSummaryForService {
    tax?: number
    jurisdictions?: TaxByTypeSummaryJurisdiction[]
}

export interface TaxByTypeSummaryJurisdiction {
    jurisdictionName?: string
    jurisdictionType?: 'City' | 'State' | 'Country'
    tax?: number
}

export interface PurchaseHeaderOut extends PurchaseHeaderIn {
    payment?: {
        terms?: PaymentTerms
        withholdingMode?: WithholdingMode
        installments?: InstallmentComplete[]
    }
}

export interface PurchaseLinesOut extends PurchaseLinesIn {
    avalaraGoodsAndServicesType?: string
    lineNetValue?: number
    calculatedTax?: PurchaseCalculatedTax
}

export interface PurchaseCalculatedTaxSummaryForService {
    numberOfLines?: number
    subtotal?: number
    totalTax?: number
    grandTotal?: number
    taxByType?: {
        issRf?: TaxByTypeSummaryForService
        pisRf?: TaxByTypeSummaryForService
        cofinsRf?: TaxByTypeSummaryForService
        csllRf?: TaxByTypeSummaryForService
        irrf?: TaxByTypeSummaryForService
        inssRf?: TaxByTypeSummaryForService
        inssAr?: TaxByTypeSummaryForService
        pis?: TaxByTypeSummaryForService
        cofins?: TaxByTypeSummaryForService
    }
}

export interface PurchaseHeaderIn extends HeaderBaseInfo {
    purchaseOrderNumber?: string
    entity?: PurchaseEntity
    payment?: {
        terms?: PaymentTerms
        installments?: PurchaseInstallmentIn[]
    }
    taxesConfig?: PurchaseTaxesConfig
    defaultLocations?: PurchaseDefaultLocations
}

export interface PurchaseEntity {
    name?: string
    type?: EntityType
    email?: string
    cnpjcpf?: string
    cityTaxId?: string
    stateTaxId?: string
    suframa?: string
    phone?: string
    taxRegime?: FederalTaxRegime
    hasCpom?: boolean
    subjectWithholdingIrrf?: boolean
    inssPreviousContrib?: number
    inssBasisDiscount?: number
    issRfRate?: number
}

export interface PurchaseInstallmentIn {
    documentNumber: string
    date: string
    grossValue: number
}

export interface PurchaseTaxesConfig {
    entityAccruableCOFINSTaxation?: 'T' | 'N' | 'Z' | 'E' | 'H' | 'S'
    entityAccruableCSLLTaxation?: 'T' | 'E'
    entityAccruablePISTaxation?: 'T' | 'N' | 'Z' | 'E' | 'H' | 'S'
    accruableCOFINSExempCodeTaxation?: string
    accruablePISExempCodeTaxation?: string
    accruablePISExemptReasonTaxation?: string
    accruableCOFINSExemptReasonTaxation?: string
    accruableCSLLExemptReasonTaxation?: string
    withholdingPIS?: boolean
    withholdingCOFINS?: boolean
    withholdingCSLL?: boolean
    withholdingIRRF?: boolean
    withholdCOFINSExemptReasonTaxation?: string
    withholdCSLLExemptReasonTaxation?: string
    withholdPISExemptReasonTaxation?: string
}

export interface PurchaseDefaultLocations
{ PointOfOrderOrigin?: PointOfOrderOrigin }

export interface PointOfOrderOrigin
{ address?: SimpleAddress }

export interface PurchaseCalculatedTax {
    taxByType?: PurchaseTaxByType
    tax?: number
    details?: PurchaseTaxByTypeDetail[]
}

export interface PurchaseLinesIn {
    lineCode?: number
    itemCode: string
    numberOfItems?: number
    lineAmount?: number
    itemDescription?: string
    lineTaxedDiscount?: number
    lineUntaxedDiscount?: number
    useType?: 'resale' | 'production' | 'use or consumption' |
    'fixed assets'
    taxDeductions?: { iss?: number }
}

export interface PurchaseTaxByType {
    issRf?: TaxByTypeTax
    pisRf?: TaxByTypeTax
    cofinsRf?: TaxByTypeTax
    csllRf?: TaxByTypeTax
    irrf?: TaxByTypeTax
    inssRf?: TaxByTypeTax
    inssAr?: TaxByTypeTax
    pis?: TaxByTypeTax
    cofins?: TaxByTypeTax
}

export interface PurchaseTaxByTypeDetail {
    locationType?: string
    jurisdictionName?: string
    jurisdictionType?: 'City' | 'State' | 'Country'
    taxType?: 'pis' | 'pisRf' | 'cofins' | 'cofinsRf' | 'csll' |
    'csllRf' | 'irrf' | 'inssAr' | 'inssRf' | 'issRf'
    rateType?: string
    scenario?: string
    subtotalTaxable?: number
    rate?: number
    tax?: number
    exemptionCode?: string
    significantLocations?: string[]
    taxRuleType?: 'SELLER' | 'BUYER' | 'TRANSACTION' | 'ITEM' | 'TAX'
}

export interface PayRecHeader {
    transactionType: 'Sale' | 'Purchase' | 'Payment' | 'Receipt'
    documentCode?: string
    currency?: string
    transactionDate: string
    taxCalculationDate?: string
    paymentMode: 'CALCULATE' | 'ASIS'
}

export interface PayRecLinesOut extends PayRecLinesIn {
    lineAmount?: number
    lineNetValue?: number
    withholdingMode?: WithholdingMode
    calculatedTax?: PaymentCalculatedTax
}

export interface PayRecCalculatedTaxSummaryForService {
    numberOfLines?: number
    subtotal?: number
    totalTax?: number
    grandTotal?: number
    pccWithholdingModes?: PccWithholdingMode[]
    taxByType?: {
        issRf?: TaxByTypeSummaryForService
        pisRf?: TaxByTypeSummaryForService
        cofinsRf?: TaxByTypeSummaryForService
        csllRf?: TaxByTypeSummaryForService
        irrf?: TaxByTypeSummaryForService
        inssRf?: TaxByTypeSummaryForService
    }
}

export interface PaymentCalculatedTax {
    taxByType?: PaymentTaxByType
    tax?: number
}

export interface PayRecLinesIn {
    lineCode?: number
    lineType?: 'installment'
    itemCode: string
    itemDescription?: string
    itemDocNumber?: string
    lineUntaxedPenality?: number
    lineUntaxedDiscount?: number
}

export interface PaymentTaxByType {
    irrf?: TaxByTypeTax
    inssRf?: TaxByTypeTax
    issRf?: TaxByTypeTax
    pisRf?: TaxByTypeTax
    cofinsRf?: TaxByTypeTax
    csllRf?: TaxByTypeTax
}

export interface PccWithholdingMode {
    type?: 'CSRF' | 'individual'
    totalTax?: number
    pisRf?: TaxByTypeTax
    cofinsRf?: TaxByTypeTax
    csllRf?: TaxByTypeTax
}

export interface PaymentLinesIn extends PayRecLinesIn {
    lineNetValue?: number
}

export interface CustomAgast extends Agast {
    companyId?: string
}

export interface CustomIcmsConfByState extends IcmsConfByState {
    companyId?: string
}

export interface CustomProcessScenario extends ProcessScenario {
    companyId?: string
}

export interface CustomTaxTypeRate extends TaxTypeRate {
    companyId?: string
}

export interface ItemCpom {
    companyId: string
    cityCode: string
    itemCode: string
    code: string
}

export interface ItemGoods extends ItemSimple {
    sealCode?: string
    nFCI?: string
    isIcmsStSubstitute?: boolean
    source?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
    productType?: 'FOR PRODUCT' | 'FOR MERCHANDISE' | 'NO RESTRICTION' |
    'SERVICE' | 'FEEDSTOCK' | 'FIXED ASSETS'
    manufacturerEquivalent?: boolean
    appropriateIPIcreditWhenInGoing?: boolean
    usuallyAppropriatePISCOFINSCredit?: boolean
    isPisCofinsEstimatedCredit?: boolean
    piscofinsRevenueType?: '01' | '02' | '03' | '04' | '05' | '06' | '07'
    icmsBaseDiscountForMonoPhaseSocialContr?: number
    cean?: string
    nve?: string
    salesUnit?: string
    salesUnitIPIfactor?: number
    salesUnitIcmsfactor?: number
    salesUnitIcmsStfactor?: number
    salesUnitPisCofinsfactor?: number
    purchaseUnit?: string
    purchaseUnitIPIfactor?: number
    purchaseUnitIcmsfactor?: number
    purchaseUnitIcmsStfactor?: number
    purchaseUnitPisCofinsfactor?: number
    firstUse?: boolean
}

export interface ItemSimple {
    companyId: string
    code: string
    agast: string
    description?: string
    isLaborCession?: boolean
}

export interface Location extends Address {
    companyId?: string
    code?: string
    type?: 'ShipFrom' | 'ShipTo' | 'ServiceRendered'
    email?: string
    federalTaxId?: string
    stateTaxId?: string
    secondaryStateTaxId?: {
        stateTaxId?: string
        state?: StateEnum
    }[]
    cityTaxId?: string
    suframa?: string
    mainActivity?: 'commerce' | 'industry' | 'service'
    nfseProcessModel?: 'edi' | 'xml' | 'rps'
}

export interface IcmsConfByState {
    code: string
    state: StateEnum
    name?: string
    startDate?: string
    expirationDate?: string
    inactive?: boolean
    subjectToST?: boolean
    icmsCST?: 'T' | 'E' | 'H' | 'D' | 'N' | 'O' | 'OZ'
    calcMode?: 'BYMVARATE' | 'SRP' | 'MMSRP' | 'OPERATIONAMOUNT'
    discountRateForMonoPhase?: number
    rate?: number
    icmsBaseDiscount?: number
    msrp?: number
    mvaRate?: number
    msrpUnit?: string
    icmsLegalReason?: string
    fcpRate?: number
    icmsSTConf?: {
        hasReductionOfMVAForSimples?: boolean
        reductionOfMVAForSimples?: number
        calcMode?: 'BYMVARATE' | 'SRP' | 'MSRP'
        mvaRate?: number
        icmsStBaseDiscount?: number
        srp?: number
        srpUnit?: string
    }
    icmsInterStateConf?: IcmsConfInterState[]
}

export interface IcmsConfInterState {
    state?: StateEnum
    calcMode?: 'BYMVARATE' | 'SRP' | 'MMSRP' | 'OPERATIONAMOUNT'
    discountRateForMonoPhase?: number
    rate?: number
    fcpRate?: number
    icmsBaseDiscount?: number
    icmsBaseDiscountInterState?: number
    msrp?: number
    mvaRate?: number
    msrpUnit?: string
    icmsLegalReason?: string
    icmsSTConf?: {
        protocolType?: 'COVENANT' | 'PROTOCOL' | 'NOTHING'
        hasReductionOfMVAForSimples?: boolean
        reductionOfMVAForSimples?: number
        calcMode?: 'BYMVARATE' | 'SRP' | 'MSRP'
        icmsStBaseDiscount?: number
        mvaRate?: number
        srp?: number
        srpUnit?: string
    }
}

export interface ProcessScenario extends TaxConf {
    name?: string
    code?: string
    type?: 'SALES' | 'PURCHASE' | 'SALES_RETURN' | 'PURCHASE_RETURN' |
    'TRANSFER_RETURN' | 'SHIPPING' | 'SHIPPING_RETURN' |
    'TRANSFER' | 'RECEIPT_AJUSTE' | 'TRANSFER_AJUSTE'
    wayType?: 'in' | 'out'
    goal?: 'Normal' | 'Complementary' | 'Voided' | 'Replacement' |
    'Return' | 'Adjustment'
    overWriteCFOP?: boolean
    cfops?: CfopConf[]
}

export interface CfopConf extends TaxConf {
    name?: string
    description?: string
    wayType?: 'in' | 'out'
    codInState?: number
    codOtherState?: number
    codOtherCountry?: number
    cstICMSSameState?: CstIcmsEnum
    cstICMSOtherState?: CstIcmsEnum
    cstICMSOtherCountry?: CstIcmsEnum
    productType?: 'FOR PRODUCT' | 'FOR MERCHANDISE' | 'NO RESTRICTION'
    operationToTaxPayerOtherState?: boolean
    operationWithST?: boolean
    operationToFreeZone?: boolean
    specificForProductClass?: 'OTHERS' | 'COMMUNICATION' | 'ENERGY' | 'TRANSPORT' |
    'FUEL AND LUBRICANT' | 'VEHICLE' | 'ALCOHOLIC BEVERAGES' |
    'WEAPONS' | 'AMMO' | 'PERFUME' | 'TOBACCO'
}

export interface TaxConf {
    code: string
    class?: string
    stockImpact?: boolean
    financialImpact?: boolean
    cstIPI?: 'T' | 'Z' | 'E' | 'H' | 'N' | 'I' | 'O' | 'OZ'
    ipiLegalTaxClass?: string
    accruablePISTaxation?: 'T' | 'Z' | 'E' | 'H' | 'N' | 'O' | 'OZ'
    pisExemptLegalReasonCode?: string
    pisExemptLegalReason?: string
    accruableCOFINSTaxation?: 'T' | 'Z' | 'E' | 'H' | 'N' | 'O' | 'OZ'
    cofinsExemptLegalReasonCode?: string
    cofinsExemptLegalReason?: string
    allowIPIcreditWhenInGoing?: boolean
    icmsConf?: IcmsTaxConf[]
}

export type CstIcmsEnum =
    '00' | '20' | '40' | '41' | '50'

export interface IcmsTaxConf extends IcmsTaxConfBase {
    sameforAllDestination?: boolean
    relationShip?: IcmsTaxConfBase[]
}

export interface IcmsTaxConfBase {
    state: StateEnum
    icmsCSOSN?: 'T' | 'E' | 'N' | 'O' | 'OZ'
    icmsCST?: 'T' | 'E' | 'H' | 'D' | 'N' | 'O' | 'OZ'
    deferralrate?: number
    messageCode?: string
}

export interface AbrasfPostOut {
    key?: string
    xml?: string
}

export interface AbrasfItGetOut {
    key?: string
    xml?: string
}

export interface AbrasfItDeleteIn
{ code?: string }

export interface SefazPostOut {
    key?: string
    documentCode?: string
    status?: SefazInvoiceStatus
}

export interface SefazDisableRangeIn {
    companyLocation?: string
    transactionModel?: '55' | '65'
    invoiceSerial?: number
    year?: number
    message?: string
    invoiceNumberInit?: number
    invoiceNumberEnd?: number
}

export interface SefazItGetOut {
    key?: string
    xml?: string
    status?: SefazInvoiceStatus
}

export interface SefazItPutIn {
    code?: string
    text?: string
}

export interface SefazItDeleteIn
{ message?: string }

export interface SefazInvoiceBasicStatus {
    code?: string
    desc?: string
}

export interface SefazInvoiceStatus extends SefazInvoiceBasicStatus {
    protocol?: string
    rec?: string
    date?: string
    environment?: '1' | '2'
    appVersion?: string
}

export type TransactionForSefazGoodsList =
    TransactionForSefazGoods[]

export interface TransactionForSefazGoods {
    header?: HeaderForGoods
    lines?: LineForSefazGoods[]
    calculatedTaxSummary?: CalculatedTaxSummaryForGoods
}

export type TransactionForAbrasfList =
    TransactionForAbrasf[]

export interface TransactionForAbrasf {
    header: SalesHeaderOut
    lines: SalesLinesOut[]
    calculatedTaxSummary: SalesCalculatedTaxSummaryForService
    processingInfo: ProcessingInfo
}

export interface LineForSefazGoods extends LineForGoods {
    extend?: AgastExtendForSefaz
}

export interface AgastExtendForSefaz {
    hsCode?: string
    ex?: number
    cest?: string
    cean?: string
    nve?: string
    unit?: string
    unitTaxable?: string
    nFCI?: string
    goal?: 'Normal' | 'Complementary' | 'Voided' | 'Replacement' |
    'Return' | 'Adjustment'
}

export interface IssConfByCity {
    cityCode: number
    name?: string
    state?: StateEnum
    issWhDestOtherCities?: boolean
    issWhDestSameCity?: boolean
    issWhOriginUnregSeller?: boolean
    serviceList?: IssConfServiceList[]
}

export interface IbptConf {
    code?: string
    description?: string
    list?: IpbtConfItem[]
}

export type CsvIbptList =
    string[][]

export interface IssConfServiceList {
    agast?: string
    cityServiceCode?: string
    taxRate?: {
        ISS?: ServiceItemTaxRate
        ISS_RF?: ServiceItemTaxRate
        ISS_E?: ServiceItemTaxRate
        ISS_I?: ServiceItemTaxRate
        ibpt?: {
            nationalFedTax?: number
            cityTax?: number
        }
    }
}

export interface ServiceItemTaxRate {
    taxType?: string
    rateType?: string
    rate?: number
    isExempt?: boolean
    discount?: number
    zone1?: number
    zone2?: number
    period?: {
        startDate?: string
        expirationDate?: string
    }
    reason?: string
    message?: string
}

export interface IpbtConfItem {
    state?: StateEnum
    federalTax?: number
    importTax?: number
    stateTax?: number
    cityTax?: number
    source?: string
}

export interface StateTransition {
    type: 'voided' | 'unvoided' | 'reconciled' | 'unreconciled' |
    'filed' | 'unfiled' | 'filedByAvalara'
    comment?: string
}

