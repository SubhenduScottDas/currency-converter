import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CurrencyConvertService } from '../providers/currency-convert.service';

interface Currency {
  symbol: string;
  denomination: string;
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})
export class CurrencyComponent {
  fromCurrency: any;
  toCurrency: any;
  fromCurrencyControl:any;
  toCurrencyControl:any;
  selectFormControl:any;
  isExchanged: boolean;
  exchanged: any;

  constructor(public currencyConvertService: CurrencyConvertService) {
    this.fromCurrency = [];
    this.toCurrency = [];
    this.isExchanged = false;
  }
  ngOnInit():void {
    this.fromCurrencyControl = new FormControl<Currency | null>(null, Validators.required);
    this.toCurrencyControl = new FormControl<Currency | null>(null, Validators.required);
    this.selectFormControl = new FormControl('', Validators.required);
    this.currencyConvertService.getSymbols().subscribe((response:any)=>{  
      console.log(response);
      this.fromCurrency = [...response];
      this.toCurrency = [...response];
    });
    this.currencyConvertService.getExchange("GBP", "INR", "100000").subscribe((response:any)=>{  
      this.isExchanged = true;
      this.exchanged = response;
      console.log("EXCHANGE:", response);
    });
    // this.fromCurrency = [
    //   { symbol: 'Dog', denomination: 'Woof!' },
    //   { symbol: 'Cat', denomination: 'Meow!' },
    //   { symbol: 'Cow', denomination: 'Moo!' },
    //   { symbol: 'Fox', denomination: 'Wa-pa-pa-pa-pa-pa-pow!' },
    // ];
    // this.toCurrency= [
    //   { symbol: 'Dog', denomination: 'Woof!' },
    //   { symbol: 'Cat', denomination: 'Meow!' },
    //   { symbol: 'Cow', denomination: 'Moo!' },
    //   { symbol: 'Fox', denomination: 'Wa-pa-pa-pa-pa-pa-pow!' },
    // ];
  }
}
