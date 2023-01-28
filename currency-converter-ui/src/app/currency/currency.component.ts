import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CurrencyConvertService } from '../providers/currency-convert.service';
import { Router } from '@angular/router';

interface Currency {
  symbol: string;
  denomination: string;
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})
export class CurrencyComponent implements OnInit {
  allCurrency: any;
  fromCurrency: any;
  toCurrency: any;
  fromCurrencyControl: any;
  toCurrencyControl: any;
  selectFormControl: any;
  isExchanged: boolean;
  exchanged: any;
  responseStr: any;
  resultCash: any;
  amount: any;
  fromCurrInitial: any;
  toCurrInitial: any;
  dateStr: any;
  exchangeForm = this.formBuilder.group({
    fromCurrencyControl: '',
    toCurrencyControl: '',
    amount: '',
  });

  constructor(
    public currencyConvertService: CurrencyConvertService,
    private formBuilder: FormBuilder,
    public router:Router
  ) {
    this.fromCurrency = [];
    this.toCurrency = [];
    this.isExchanged = false;
  }
  ngOnInit(): void {
    this.fromCurrencyControl = new FormControl<Currency | null>(
      null,
      Validators.required
    );
    this.toCurrencyControl = new FormControl<Currency | null>(
      null,
      Validators.required
    );
    this.amount = new FormControl(null, Validators.required);
    this.selectFormControl = new FormControl('', Validators.required);
    this.currencyConvertService.getSymbols().subscribe((response: any) => {
      console.log(response);
      this.allCurrency = [...response];
      this.fromCurrency = [...response];
      this.toCurrency = [...response];
    });
  }

  onSubmit(): void {
    console.log(this.exchangeForm.value.amount);
    console.log(this.fromCurrencyControl.value.symbol);
    console.log(this.toCurrencyControl.value.symbol);
    if(this.exchangeForm.value && this.fromCurrencyControl.value && this.toCurrencyControl.value){
      this.currencyConvertService
      .getExchange(
        this.fromCurrencyControl.value.symbol,
        this.toCurrencyControl.value.symbol,
        this.exchangeForm.value.amount
      )
      .subscribe((response: any) => {
        this.isExchanged = true;
        this.exchanged = response;
        this. responseStr = `EXCHANGE RATE: ${this.fromCurrencyControl.value.symbol}(${this.fromCurrencyControl.value.denomination}) 1.00 = ${this.toCurrencyControl.value.symbol}(${this.toCurrencyControl.value.denomination}) ${this.exchanged.rate}`;
        this.resultCash = `${this.toCurrencyControl.value.symbol} ${this.exchanged.result}`;
        this.dateStr = `Exchage rate in accordance to the one published on ${this.exchanged.date}`;
        console.log('EXCHANGE:', response);
      });
    }
    else{
      this.responseStr="EXCHANGE RATE UNAVAILABLE"
      console.log("FAILED")
    }
  }

  onReset(): void {
    this.isExchanged= false;
    this.fromCurrInitial='';
    this.toCurrInitial='';
  }
}
