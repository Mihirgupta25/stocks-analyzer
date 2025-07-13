#!/usr/bin/env python3
"""
Simple test script to verify core functionality of the Stock Portfolio Analyzer
"""

import yfinance as yf
import numpy as np
from datetime import datetime

def test_stock_data():
    """Test basic stock data retrieval"""
    print("Testing stock data retrieval...")
    
    # Test with a well-known stock
    try:
        stock = yf.Ticker("AAPL")
        info = stock.info
        
        print(f"✓ Successfully retrieved data for AAPL")
        print(f"  - Company: {info.get('longName', 'N/A')}")
        print(f"  - Current Price: ${info.get('regularMarketPrice', 'N/A')}")
        print(f"  - P/E Ratio: {info.get('trailingPE', 'N/A')}")
        print(f"  - Dividend Yield: {info.get('dividendYield', 'N/A')}")
        
        return True
    except Exception as e:
        print(f"✗ Error retrieving stock data: {e}")
        return False

def test_sharpe_calculation():
    """Test Sharpe ratio calculation"""
    print("\nTesting Sharpe ratio calculation...")
    
    try:
        stock = yf.Ticker("MSFT")
        hist = stock.history(period="1y")
        
        if len(hist) > 30:
            returns = hist['Close'].pct_change().dropna()
            excess_returns = returns - 0.02/252  # 2% annual risk-free rate
            sharpe = np.sqrt(252) * excess_returns.mean() / returns.std()
            
            print(f"✓ Successfully calculated Sharpe ratio for MSFT: {sharpe:.4f}")
            return True
        else:
            print("✗ Insufficient data for Sharpe calculation")
            return False
    except Exception as e:
        print(f"✗ Error calculating Sharpe ratio: {e}")
        return False

def test_portfolio_creation():
    """Test portfolio creation logic"""
    print("\nTesting portfolio creation...")
    
    try:
        # Mock data
        selected_stocks = [
            {'symbol': 'AAPL', 'current_price': 150.0},
            {'symbol': 'MSFT', 'current_price': 300.0},
            {'symbol': 'GOOGL', 'current_price': 2500.0}
        ]
        
        portfolio_amount = 10000
        
        # Equal weight allocation
        allocation_per_stock = portfolio_amount / len(selected_stocks)
        
        portfolio = []
        for stock in selected_stocks:
            shares = int(allocation_per_stock / stock['current_price'])
            actual_allocation = shares * stock['current_price']
            
            portfolio.append({
                'symbol': stock['symbol'],
                'shares': shares,
                'allocation': actual_allocation,
                'percentage': (actual_allocation / portfolio_amount) * 100
            })
        
        total_allocation = sum(stock['allocation'] for stock in portfolio)
        diversification_score = 1 - (max(stock['percentage'] for stock in portfolio) / 100)
        
        print(f"✓ Successfully created portfolio")
        print(f"  - Total Allocation: ${total_allocation:.2f}")
        print(f"  - Diversification Score: {diversification_score:.2%}")
        
        for stock in portfolio:
            print(f"  - {stock['symbol']}: {stock['shares']} shares, ${stock['allocation']:.2f} ({stock['percentage']:.1f}%)")
        
        return True
    except Exception as e:
        print(f"✗ Error creating portfolio: {e}")
        return False

def test_growth_projection():
    """Test growth projection calculation"""
    print("\nTesting growth projection...")
    
    try:
        stock = yf.Ticker("AAPL")
        hist = stock.history(period="2y")
        
        if len(hist) > 30:
            # Prepare data for linear regression
            dates = np.arange(len(hist))
            prices = hist['Close'].values
            
            # Simple linear regression
            slope = np.polyfit(dates, prices, 1)[0]
            
            current_price = prices[-1]
            projected_price = current_price + slope * 30  # 30 days projection
            growth_percentage = ((projected_price - current_price) / current_price) * 100
            
            print(f"✓ Successfully calculated growth projection for AAPL")
            print(f"  - Current Price: ${current_price:.2f}")
            print(f"  - Projected Price (30 days): ${projected_price:.2f}")
            print(f"  - Growth Percentage: {growth_percentage:.2f}%")
            
            return True
        else:
            print("✗ Insufficient data for growth projection")
            return False
    except Exception as e:
        print(f"✗ Error calculating growth projection: {e}")
        return False

def main():
    """Run all tests"""
    print("Stock Portfolio Analyzer - Functionality Tests")
    print("=" * 50)
    
    tests = [
        test_stock_data,
        test_sharpe_calculation,
        test_portfolio_creation,
        test_growth_projection
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
    
    print("\n" + "=" * 50)
    print(f"Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("✓ All tests passed! The application should work correctly.")
    else:
        print("✗ Some tests failed. Please check the implementation.")
    
    print("\nTo run the web application:")
    print("1. Open a new terminal")
    print("2. Navigate to the project directory")
    print("3. Run: python3 app.py")
    print("4. Open http://127.0.0.1:5000 in your browser")

if __name__ == "__main__":
    main() 