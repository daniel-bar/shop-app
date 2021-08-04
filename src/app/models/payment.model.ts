import { IDBCollectionInterface, DBCollection } from './db-collection.model';

export enum PaymentMonth {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export enum PaymentYear {
  Y_2021 = 2021,
  Y_2022,
  Y_2023,
  Y_2024,
  Y_2025,
}

export interface IPaymentInterface extends IDBCollectionInterface {
  readonly save: boolean;
  readonly fullname: string;
  readonly address: string;
  readonly country: string;
  readonly city: string;
  readonly cardNumber: string;
  readonly expiryDateMonth: PaymentMonth;
  readonly expiryDateYear: PaymentYear;
  readonly nameOnCard: string;
  readonly cvv: string;
}

export class Payment extends DBCollection {
  private _save: boolean;
  private _fullname: string;
  private _address: string;
  private _country: string;
  private _city: string;
  private _cardNumber: string;
  private _expiryDateMonth: PaymentMonth;
  private _expiryDateYear: PaymentYear;
  private _nameOnCard: string;
  private _cvv: string;

  constructor(paymentData: IPaymentInterface) {
    super({
      id: paymentData.id,
      createdAt: paymentData.createdAt,
      updatedAt: paymentData.updatedAt,
    });

    this._save = paymentData.save;
    this._fullname = paymentData.fullname;
    this._address = paymentData.address;
    this._country = paymentData.country;
    this._city = paymentData.city;
    this._cardNumber = paymentData.cardNumber;
    this._expiryDateMonth = paymentData.expiryDateMonth;
    this._expiryDateYear = paymentData.expiryDateYear;
    this._nameOnCard = paymentData.nameOnCard;
    this._cvv = paymentData.cvv;
  }

  /**
   * Getter for save
   * @returns save boolean
   */
  public getSave(): boolean {
    return this._save;
  }

  /**
   * Getter for fullname
   * @returns fullname string
   */
  public getFullname(): string {
    return this._fullname;
  }

  /**
   * Getter for address
   * @returns address string
   */
  public getAddress(): string {
    return this._address;
  }

  /**
   * Getter for country
   * @returns country string
   */
  public getCountry(): string {
    return this._country;
  }

  /**
   * Getter for city
   * @returns city string
   */
  public getCity(): string {
    return this._city;
  }

  /**
   * Getter for cardNumber
   * @returns cardNumber string
   */
  public getCardNumber(): string {
    return this._cardNumber;
  }

  /**
   * Getter for expiryDateMonth
   * @returns expiryDateMonth number
   */
  public getExpiryDateMonth(): PaymentMonth {
    return this._expiryDateMonth;
  }

  /**
   * Getter for expiryDateYear
   * @returns expiryDateYear number
   */
  public getExpiryDateYear(): PaymentYear {
    return this._expiryDateYear;
  }

  /**
   * Getter for nameOnCard
   * @returns nameOnCard string
   */
  public getNameOnCard(): string {
    return this._nameOnCard;
  }

  /**
   * Getter for cvv
   * @returns cvv string
   */
  public getCvv(): string {
    return this._cvv;
  }

  /**
   * Setter for save
   * @returns void
   */
  public setSave(save: boolean): void {
    this._save = save;
  }

  /**
   * Setter for fullname
   * @returns void
   */
  public setFullname(fullname: string): void {
    this._fullname = fullname;
  }

  /**
   * Setter for address
   * @returns void
   */
  public setAddress(address: string): void {
    this._address = address;
  }

  /**
   * Setter for country
   * @returns void
   */
  public setCountry(country: string): void {
    this._country = country;
  }

  /**
   * Setter for city
   * @returns void
   */
  public setCity(city: string): void {
    this._city = city;
  }

  /**
   * Setter for cardNumber
   * @returns void
   */
  public setCardNumber(cardNumber: string): void {
    this._cardNumber = cardNumber;
  }

  /**
   * Setter for expiryDateMonth
   * @returns void
   */
  public setExpiryDateMonth(expiryDateMonth: PaymentMonth): void {
    this._expiryDateMonth = expiryDateMonth;
  }

  /**
   * Setter for expiryDateYear
   * @returns void
   */
  public setExpiryDateYear(expiryDateYear: PaymentYear): void {
    this._expiryDateYear = expiryDateYear;
  }

  /**
   * Setter for nameOnCard
   * @returns void
   */
  public setNameOnCard(nameOnCard: string): void {
    this._nameOnCard = nameOnCard;
  }

  /**
   * Setter for cvv
   * @returns void
   */
  public setCvv(cvv: string): void {
    this._cvv = cvv;
  }
}
