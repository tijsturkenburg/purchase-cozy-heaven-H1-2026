import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, AlertCircle, CheckCircle, Save, FolderOpen, Trash2, X, Sparkles, Menu, Settings } from 'lucide-react';

export default function OrderConfigurator() {
  const [fabricWidth] = useState(240);
  const [moq] = useState(2000);
  
  const fabricProducts = [
    // Individual Duvet Covers
    { id: 'dc-135-200', item: 'Duvet cover', width: 135, length: 200, type: 'cover', category: 'individual', sku: '' },
    { id: 'dc-155-220', item: 'Duvet cover', width: 155, length: 220, type: 'cover', category: 'individual', sku: '' },
    { id: 'dc-200-200', item: 'Duvet cover', width: 200, length: 200, type: 'cover', category: 'individual', sku: '' },
    { id: 'dc-200-220', item: 'Duvet cover', width: 200, length: 220, type: 'cover', category: 'individual', sku: '' },
    { id: 'dc-240-220', item: 'Duvet cover', width: 240, length: 220, type: 'cover', category: 'individual', sku: '' },
    
    // Individual Pillowcases
    { id: 'pc-40-80', item: 'Pillowcase', width: 40, length: 80, type: 'pillowcase', category: 'individual', sku: 'CH020214' },
    { id: 'pc-80-80', item: 'Pillowcase', width: 80, length: 80, type: 'pillowcase', category: 'individual', sku: 'CH020314' },
    
    // Individual Fitted Sheets
    { id: 'fs-90-200', item: 'Fitted sheet', width: 90, length: 200, type: 'sheet', category: 'individual', sku: 'CH031514' },
    { id: 'fs-100-200', item: 'Fitted sheet', width: 100, length: 200, type: 'sheet', category: 'individual', sku: 'CH313414' },
    { id: 'fs-120-200', item: 'Fitted sheet', width: 120, length: 200, type: 'sheet', category: 'individual', sku: '' },
    { id: 'fs-140-200', item: 'Fitted sheet', width: 140, length: 200, type: 'sheet', category: 'individual', sku: 'CH031614' },
    { id: 'fs-160-200', item: 'Fitted sheet', width: 160, length: 200, type: 'sheet', category: 'individual', sku: 'CH031714' },
    { id: 'fs-180-200', item: 'Fitted sheet', width: 180, length: 200, type: 'sheet', category: 'individual', sku: 'CH031414' },
    { id: 'fs-200-200', item: 'Fitted sheet', width: 200, length: 200, type: 'sheet', category: 'individual', sku: 'CH030114' },
    { id: 'fs-200-220', item: 'Fitted sheet', width: 200, length: 220, type: 'sheet', category: 'individual', sku: 'CH031814' },
    
    // Bedding Sets (bundles)
    { id: 'set-135-200-40-80', item: 'Bedding set', width: 135, length: 200, pillowSize: '40×80', pillowCount: 1, type: 'set', category: 'sets', sku: 'CH040814', 
      components: ['dc-135-200', 'pc-40-80'] },
    { id: 'set-135-200-80-80', item: 'Bedding set', width: 135, length: 200, pillowSize: '80×80', pillowCount: 1, type: 'set', category: 'sets', sku: 'CH040714',
      components: ['dc-135-200', 'pc-80-80'] },
    { id: 'set-155-220-40-80', item: 'Bedding set', width: 155, length: 220, pillowSize: '40×80', pillowCount: 1, type: 'set', category: 'sets', sku: 'CH041214',
      components: ['dc-155-220', 'pc-40-80'] },
    { id: 'set-155-220-80-80', item: 'Bedding set', width: 155, length: 220, pillowSize: '80×80', pillowCount: 1, type: 'set', category: 'sets', sku: 'CH041114',
      components: ['dc-155-220', 'pc-80-80'] },
    { id: 'set-200-200-40-80-2x', item: 'Bedding set', width: 200, length: 200, pillowSize: '40×80', pillowCount: 2, type: 'set', category: 'sets', sku: 'CH040514',
      components: ['dc-200-200', 'pc-40-80', 'pc-40-80'] },
    { id: 'set-200-200-80-80-2x', item: 'Bedding set', width: 200, length: 200, pillowSize: '80×80', pillowCount: 2, type: 'set', category: 'sets', sku: 'CH040614',
      components: ['dc-200-200', 'pc-80-80', 'pc-80-80'] },
    { id: 'set-200-220-40-80-2x', item: 'Bedding set', width: 200, length: 220, pillowSize: '40×80', pillowCount: 2, type: 'set', category: 'sets', sku: 'CH041014',
      components: ['dc-200-220', 'pc-40-80', 'pc-40-80'] },
    { id: 'set-200-220-80-80-2x', item: 'Bedding set', width: 200, length: 220, pillowSize: '80×80', pillowCount: 2, type: 'set', category: 'sets', sku: 'CH040914',
      components: ['dc-200-220', 'pc-80-80', 'pc-80-80'] },
    { id: 'set-240-220-40-80-2x', item: 'Bedding set', width: 240, length: 220, pillowSize: '40×80', pillowCount: 2, type: 'set', category: 'sets', sku: 'CH043314',
      components: ['dc-240-220', 'pc-40-80', 'pc-40-80'] },
    { id: 'set-240-220-80-80-2x', item: 'Bedding set', width: 240, length: 220, pillowSize: '80×80', pillowCount: 2, type: 'set', category: 'sets', sku: 'CH043214',
      components: ['dc-240-220', 'pc-80-80', 'pc-80-80'] }
  ];

  const initialColours = [
    { 
      id: 1, 
      name: 'Stone Grey', 
      orders: {
        // Bedding sets (Bettwäsche)
        'set-135-200-40-80': 190,
        'set-135-200-80-80': 256,
        'set-155-220-40-80': 62,
        'set-155-220-80-80': 65,
        'set-200-200-40-80-2x': 6,
        'set-200-200-80-80-2x': 23,
        'set-200-220-40-80-2x': 3,
        'set-200-220-80-80-2x': 15,
        'set-240-220-40-80-2x': 4,
        'set-240-220-80-80-2x': 7,
        
        // Individual duvet covers (auto-added from sets above)
        'dc-135-200': 190 + 256,  // from both 135x200 sets
        'dc-155-220': 62 + 65,    // from both 155x220 sets
        'dc-200-200': 6 + 23,     // from both 200x200 sets
        'dc-200-220': 3 + 15,     // from both 200x220 sets
        'dc-240-220': 4 + 7,      // from both 240x220 sets
        
        // Individual pillowcases (Kissenbezug)
        // Base quantities from screenshot, plus auto-added from sets
        'pc-40-80': 74 + 190 + 62 + (6*2) + (3*2) + (4*2),  // 74 individual + sets
        'pc-80-80': 31 + 256 + 65 + (23*2) + (15*2) + (7*2), // 31 individual + sets
        
        // Fitted sheets (Spannbettlaken)
        'fs-100-200': 68,
        'fs-140-200': 57,
        'fs-160-200': 36,
        'fs-180-200': 89,
        'fs-200-200': 61,
        'fs-200-220': 31,
        'fs-90-200': 90
      }
    }
  ];

  const [colours, setColours] = useState(initialColours);
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showScenarioInput, setShowScenarioInput] = useState(false);
  const [showLoadDropdown, setShowLoadDropdown] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [showOptimization, setShowOptimization] = useState(null); // colourId or null
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [showPercentageCalculator, setShowPercentageCalculator] = useState(null); // colourId or null
  const [percentageResult, setPercentageResult] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showScenarioManager, setShowScenarioManager] = useState(false);
  const [newScenarioName, setNewScenarioName] = useState('');

  // Product distribution percentages based on the image
  const productPercentages = {
    // Bedding Sets (Bettwäsche) - percentages
    'set-135-200-40-80': 15,
    'set-135-200-80-80': 26,
    'set-155-220-40-80': 7,
    'set-155-220-80-80': 8,
    'set-200-200-40-80-2x': 1,
    'set-200-200-80-80-2x': 2,
    'set-200-220-40-80-2x': 1,
    'set-200-220-80-80-2x': 1,
    'set-240-220-40-80-2x': 1,
    'set-240-220-80-80-2x': 1,
    
    // Pillowcases (Kissenbezug) - percentages
    'pc-40-80': 70,
    'pc-80-80': 30,
    
    // Fitted Sheets (Spannbettlaken) - percentages
    'fs-100-200': 4,
    'fs-120-200': 1,
    'fs-140-200': 4,
    'fs-160-200': 3,
    'fs-180-200': 7,
    'fs-200-200': 4,
    'fs-200-220': 3,
    'fs-90-200': 7
  };

  // Load scenarios from localStorage on mount
  useEffect(() => {
    const savedScenarios = localStorage.getItem('orderScenarios');
    if (savedScenarios) {
      try {
        setScenarios(JSON.parse(savedScenarios));
      } catch (e) {
        console.error('Error loading scenarios:', e);
      }
    }
  }, []);

  // Save scenarios to localStorage whenever scenarios change
  useEffect(() => {
    if (scenarios.length > 0) {
      localStorage.setItem('orderScenarios', JSON.stringify(scenarios));
    }
  }, [scenarios]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      
      if (showScenarioInput || showLoadDropdown) {
        if (!target.closest('.scenario-dropdown')) {
          setShowScenarioInput(false);
          setShowLoadDropdown(false);
        }
      }
      
      if (showMenu && !target.closest('.menu-dropdown')) {
        setShowMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        if (showOptimization) {
          setShowOptimization(null);
          setOptimizationResult(null);
        }
        if (showPercentageCalculator) {
          setShowPercentageCalculator(null);
          setPercentageResult(null);
        }
        if (showScenarioManager) {
          setShowScenarioManager(false);
        }
        if (showMenu) {
          setShowMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showScenarioInput, showLoadDropdown, showOptimization, showPercentageCalculator, showScenarioManager, showMenu]);

  const calculateFabric = (width, length, type, pillowSize, pillowCount) => {
    // For bedding sets, calculate duvet cover + pillowcases
    if (type === 'set') {
      const duvetFabric = calculateSingleItem(width, length, 'cover');
      
      // Parse pillow size (e.g., "40×80" -> width: 40, length: 80)
      const [pillowWidth, pillowLength] = pillowSize.split('×').map(Number);
      const pillowFabric = calculateSingleItem(pillowWidth, pillowLength, 'pillowcase');
      
      return duvetFabric + (pillowFabric * pillowCount);
    }
    
    return calculateSingleItem(width, length, type);
  };

  const calculateSingleItem = (width, length, type) => {
    const isPillow = type === 'pillowcase';
    const isSheet = type === 'sheet';
    const pieces = isSheet ? 1 : 2;
    const flapAllowance = isPillow ? 0.25 : 0;
    const seamAllowance = 0.04;
    const elasticExtra = isSheet ? 0.20 : 0;
    
    const pieceWidth = width / 100 + seamAllowance;
    const pieceLength = length / 100 + seamAllowance + flapAllowance + elasticExtra;
    
    const fabricWidthM = fabricWidth / 100;
    const piecesAcrossWidth = Math.floor(fabricWidthM / pieceWidth);
    
    if (piecesAcrossWidth >= pieces) {
      return parseFloat(pieceLength.toFixed(2));
    } else if (piecesAcrossWidth === 1) {
      return parseFloat((pieces * pieceLength).toFixed(2));
    } else {
      return parseFloat((pieceLength * 2).toFixed(2));
    }
  };

  const updateQuantity = (colourId, productId, change) => {
    setColours(colours.map(colour => {
      if (colour.id === colourId) {
        const product = fabricProducts.find(p => p.id === productId);
        const newOrders = { ...colour.orders };
        
        // If it's a set, update the set quantity AND its components
        if (product.type === 'set') {
          const currentSetQty = newOrders[productId] || 0;
          const newSetQty = Math.max(0, currentSetQty + change);
          
          if (newSetQty === 0) {
            delete newOrders[productId];
          } else {
            newOrders[productId] = newSetQty;
          }
          
          // Update individual components
          product.components.forEach(componentId => {
            const currentComponentQty = newOrders[componentId] || 0;
            const newComponentQty = Math.max(0, currentComponentQty + change);
            
            if (newComponentQty === 0) {
              delete newOrders[componentId];
            } else {
              newOrders[componentId] = newComponentQty;
            }
          });
        } else {
          // If it's an individual item, just update that item
          const currentQty = newOrders[productId] || 0;
          const newQty = Math.max(0, currentQty + change);
          
          if (newQty === 0) {
            delete newOrders[productId];
          } else {
            newOrders[productId] = newQty;
          }
        }
        
        return { ...colour, orders: newOrders };
      }
      return colour;
    }));
  };

  const setQuantity = (colourId, productId, value) => {
    const qty = parseInt(value) || 0;
    setColours(colours.map(colour => {
      if (colour.id === colourId) {
        const product = fabricProducts.find(p => p.id === productId);
        const newOrders = { ...colour.orders };
        
        // If it's a set, set the quantity for the set AND its components
        if (product.type === 'set') {
          if (qty === 0) {
            delete newOrders[productId];
          } else {
            newOrders[productId] = qty;
          }
          
          // Set individual components to match
          const oldSetQty = colour.orders[productId] || 0;
          const change = qty - oldSetQty;
          
          product.components.forEach(componentId => {
            const currentComponentQty = newOrders[componentId] || 0;
            const newComponentQty = Math.max(0, currentComponentQty + change);
            
            if (newComponentQty === 0) {
              delete newOrders[componentId];
            } else {
              newOrders[componentId] = newComponentQty;
            }
          });
        } else {
          // If it's an individual item, just set that item
          if (qty === 0) {
            delete newOrders[productId];
          } else {
            newOrders[productId] = qty;
          }
        }
        
        return { ...colour, orders: newOrders };
      }
      return colour;
    }));
  };

  const calculateColourTotal = (colour) => {
    let total = 0;
    Object.entries(colour.orders).forEach(([productId, qty]) => {
      const product = fabricProducts.find(p => p.id === productId);
      // Only count individual items, not sets (to avoid double counting)
      if (product && product.category === 'individual') {
        const fabricPerUnit = calculateFabric(product.width, product.length, product.type, product.pillowSize, product.pillowCount);
        total += fabricPerUnit * qty;
      }
    });
    return total;
  };

  const addColour = () => {
    const newId = Math.max(...colours.map(c => c.id)) + 1;
    setColours([...colours, { id: newId, name: `Colour ${newId}`, orders: {} }]);
  };

  const removeColour = (colourId) => {
    setColours(colours.filter(c => c.id !== colourId));
  };

  const updateColourName = (colourId, newName) => {
    setColours(colours.map(c => c.id === colourId ? { ...c, name: newName } : c));
  };

  const clearAllNumbers = () => {
    if (window.confirm('Are you sure you want to clear all quantities? This cannot be undone.')) {
      setColours(colours.map(colour => ({
        ...colour,
        orders: {}
      })));
    }
  };

  const saveScenario = (name = null) => {
    const scenarioNameToUse = name || scenarioName;
    if (!scenarioNameToUse.trim()) {
      alert('Please enter a scenario name');
      return;
    }

    const newScenario = {
      id: Date.now(),
      name: scenarioNameToUse.trim(),
      colours: JSON.parse(JSON.stringify(colours)), // Deep copy
      savedAt: new Date().toISOString()
    };

    const updatedScenarios = [...scenarios, newScenario];
    setScenarios(updatedScenarios);
    localStorage.setItem('orderScenarios', JSON.stringify(updatedScenarios));
    setScenarioName('');
    setNewScenarioName('');
    setShowScenarioInput(false);
    setShowScenarioManager(false);
    alert(`Scenario "${newScenario.name}" saved successfully!`);
  };

  const loadScenario = (scenarioId) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      if (window.confirm(`Load scenario "${scenario.name}"? This will replace your current order.`)) {
        setColours(JSON.parse(JSON.stringify(scenario.colours))); // Deep copy
        setSelectedScenario(scenarioId);
      }
    }
  };

  const deleteScenario = (scenarioId, e) => {
    e.stopPropagation();
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario && window.confirm(`Delete scenario "${scenario.name}"?`)) {
      const updatedScenarios = scenarios.filter(s => s.id !== scenarioId);
      setScenarios(updatedScenarios);
      localStorage.setItem('orderScenarios', JSON.stringify(updatedScenarios));
      if (selectedScenario === scenarioId) {
        setSelectedScenario(null);
      }
    }
  };

  const optimizeComposition = (colourId) => {
    const colour = colours.find(c => c.id === colourId);
    if (!colour) return;

    const currentTotal = calculateColourTotal(colour);
    const target = moq;
    const difference = target - currentTotal;

    // Get all individual products (not sets) with their fabric per unit
    const individualProducts = fabricProducts
      .filter(p => p.category === 'individual')
      .map(product => ({
        ...product,
        fabricPerUnit: calculateFabric(product.width, product.length, product.type, product.pillowSize, product.pillowCount),
        currentQty: colour.orders[product.id] || 0
      }))
      .sort((a, b) => b.fabricPerUnit - a.fabricPerUnit); // Sort by fabric per unit (descending)

    const recommendations = {
      currentTotal: currentTotal,
      target: target,
      difference: difference,
      suggestions: [],
      newTotal: currentTotal
    };

    if (difference > 0) {
      // Need to add products to meet MOQ
      let remaining = difference;
      const suggestions = [];

      // Try to add products efficiently
      for (const product of individualProducts) {
        if (remaining <= 0) break;

        const unitsNeeded = Math.ceil(remaining / product.fabricPerUnit);
        const fabricAdded = unitsNeeded * product.fabricPerUnit;
        
        if (unitsNeeded > 0 && fabricAdded <= remaining + product.fabricPerUnit) {
          suggestions.push({
            productId: product.id,
            productName: `${product.item} ${product.width}×${product.length}`,
            action: 'add',
            units: unitsNeeded,
            currentQty: product.currentQty,
            newQty: product.currentQty + unitsNeeded,
            fabricPerUnit: product.fabricPerUnit,
            totalFabric: fabricAdded
          });
          remaining -= fabricAdded;
          recommendations.newTotal += fabricAdded;
        }
      }

      // If still not enough, suggest adding more of existing products
      if (remaining > 0) {
        for (const product of individualProducts) {
          if (remaining <= 0) break;
          if (product.currentQty > 0) {
            const unitsNeeded = Math.ceil(remaining / product.fabricPerUnit);
            const fabricAdded = unitsNeeded * product.fabricPerUnit;
            
            suggestions.push({
              productId: product.id,
              productName: `${product.item} ${product.width}×${product.length}`,
              action: 'add',
              units: unitsNeeded,
              currentQty: product.currentQty,
              newQty: product.currentQty + unitsNeeded,
              fabricPerUnit: product.fabricPerUnit,
              totalFabric: fabricAdded
            });
            remaining -= fabricAdded;
            recommendations.newTotal += fabricAdded;
          }
        }
      }

      recommendations.suggestions = suggestions;
    } else if (difference < -100) {
      // Over MOQ by more than 100m, suggest reducing
      let excess = Math.abs(difference);
      const suggestions = [];

      // Sort by current quantity (descending) to reduce from products with most units
      const productsWithOrders = individualProducts
        .filter(p => p.currentQty > 0)
        .sort((a, b) => b.currentQty - a.currentQty);

      for (const product of productsWithOrders) {
        if (excess <= 0) break;

        const unitsToReduce = Math.min(
          Math.floor(excess / product.fabricPerUnit),
          product.currentQty
        );

        if (unitsToReduce > 0) {
          const fabricReduced = unitsToReduce * product.fabricPerUnit;
          suggestions.push({
            productId: product.id,
            productName: `${product.item} ${product.width}×${product.length}`,
            action: 'reduce',
            units: unitsToReduce,
            currentQty: product.currentQty,
            newQty: product.currentQty - unitsToReduce,
            fabricPerUnit: product.fabricPerUnit,
            totalFabric: fabricReduced
          });
          excess -= fabricReduced;
          recommendations.newTotal -= fabricReduced;
        }
      }

      recommendations.suggestions = suggestions;
    }

    setOptimizationResult({ colourId, colourName: colour.name, ...recommendations });
    setShowOptimization(colourId);
  };

  const applyOptimization = () => {
    if (!optimizationResult) return;

    const { colourId, suggestions } = optimizationResult;
    
    setColours(colours.map(colour => {
      if (colour.id === colourId) {
        const newOrders = { ...colour.orders };
        
        suggestions.forEach(suggestion => {
          if (suggestion.action === 'add') {
            newOrders[suggestion.productId] = (newOrders[suggestion.productId] || 0) + suggestion.units;
          } else if (suggestion.action === 'reduce') {
            const newQty = Math.max(0, (newOrders[suggestion.productId] || 0) - suggestion.units);
            if (newQty === 0) {
              delete newOrders[suggestion.productId];
            } else {
              newOrders[suggestion.productId] = newQty;
            }
          }
        });

        return { ...colour, orders: newOrders };
      }
      return colour;
    }));

    setShowOptimization(null);
    setOptimizationResult(null);
  };

  const calculateFromPercentages = (colourId, totalFabricMeters) => {
    const colour = colours.find(c => c.id === colourId);
    if (!colour) return;

    // Calculate total percentage for normalization
    const totalPercentage = Object.values(productPercentages).reduce((sum, pct) => sum + pct, 0);
    
    // Calculate fabric per percentage point
    const fabricPerPercent = totalFabricMeters / totalPercentage;
    
    // Calculate quantities for each product based on percentages
    const calculatedOrders = {};
    const breakdown = {
      sets: {},
      individualItems: {},
      totalFabric: 0
    };

    // Process bedding sets first
    fabricProducts.filter(p => p.category === 'sets').forEach(set => {
      const percentage = productPercentages[set.id] || 0;
      if (percentage > 0) {
        const fabricForSet = fabricPerPercent * percentage;
        const fabricPerSet = calculateFabric(set.width, set.length, set.type, set.pillowSize, set.pillowCount);
        const quantity = Math.round(fabricForSet / fabricPerSet);
        
        if (quantity > 0) {
          calculatedOrders[set.id] = quantity;
          breakdown.sets[set.id] = {
            quantity,
            fabricPerSet,
            totalFabric: quantity * fabricPerSet,
            percentage
          };
          breakdown.totalFabric += quantity * fabricPerSet;

          // Break down set into individual components
          set.components.forEach(componentId => {
            if (!calculatedOrders[componentId]) {
              calculatedOrders[componentId] = 0;
            }
            calculatedOrders[componentId] += quantity;
          });
        }
      }
    });

    // Process individual pillowcases (Kissenbezug)
    ['pc-40-80', 'pc-80-80'].forEach(pcId => {
      const percentage = productPercentages[pcId] || 0;
      if (percentage > 0) {
        const product = fabricProducts.find(p => p.id === pcId);
        if (product) {
          const fabricForItem = fabricPerPercent * percentage;
          const fabricPerUnit = calculateFabric(product.width, product.length, product.type, product.pillowSize, product.pillowCount);
          const quantity = Math.round(fabricForItem / fabricPerUnit);
          
          if (quantity > 0) {
            // Add to existing quantity from sets
            calculatedOrders[pcId] = (calculatedOrders[pcId] || 0) + quantity;
            breakdown.individualItems[pcId] = {
              quantity: calculatedOrders[pcId],
              fabricPerUnit,
              totalFabric: calculatedOrders[pcId] * fabricPerUnit,
              percentage,
              fromSets: calculatedOrders[pcId] - quantity,
              individual: quantity
            };
            breakdown.totalFabric += quantity * fabricPerUnit;
          }
        }
      }
    });

    // Process fitted sheets
    ['fs-90-200', 'fs-100-200', 'fs-120-200', 'fs-140-200', 'fs-160-200', 'fs-180-200', 'fs-200-200', 'fs-200-220'].forEach(fsId => {
      const percentage = productPercentages[fsId] || 0;
      if (percentage > 0) {
        const product = fabricProducts.find(p => p.id === fsId);
        if (product) {
          const fabricForItem = fabricPerPercent * percentage;
          const fabricPerUnit = calculateFabric(product.width, product.length, product.type, product.pillowSize, product.pillowCount);
          const quantity = Math.round(fabricForItem / fabricPerUnit);
          
          if (quantity > 0) {
            calculatedOrders[fsId] = quantity;
            breakdown.individualItems[fsId] = {
              quantity,
              fabricPerUnit,
              totalFabric: quantity * fabricPerUnit,
              percentage
            };
            breakdown.totalFabric += quantity * fabricPerUnit;
          }
        }
      }
    });

    // Calculate individual duvet covers from sets
    fabricProducts.filter(p => p.type === 'cover' && p.category === 'individual').forEach(dc => {
      const setsWithThisDc = fabricProducts.filter(p => 
        p.category === 'sets' && 
        p.components && 
        p.components.includes(dc.id)
      );
      
      let totalDcQuantity = 0;
      setsWithThisDc.forEach(set => {
        totalDcQuantity += calculatedOrders[set.id] || 0;
      });
      
      if (totalDcQuantity > 0) {
        calculatedOrders[dc.id] = totalDcQuantity;
        const fabricPerUnit = calculateFabric(dc.width, dc.length, dc.type, dc.pillowSize, dc.pillowCount);
        breakdown.individualItems[dc.id] = {
          quantity: totalDcQuantity,
          fabricPerUnit,
          totalFabric: totalDcQuantity * fabricPerUnit,
          percentage: null, // Calculated from sets
          fromSets: totalDcQuantity
        };
      }
    });

    setPercentageResult({
      colourId,
      colourName: colour.name,
      totalFabricMeters,
      calculatedOrders,
      breakdown,
      summary: {
        totalSets: Object.values(breakdown.sets).reduce((sum, s) => sum + s.quantity, 0),
        totalIndividualItems: Object.values(breakdown.individualItems).reduce((sum, i) => sum + i.quantity, 0),
        totalCalculatedFabric: breakdown.totalFabric
      }
    });
    setShowPercentageCalculator(colourId);
  };

  const applyPercentageCalculation = () => {
    if (!percentageResult) return;

    const { colourId, calculatedOrders } = percentageResult;
    
    setColours(colours.map(colour => {
      if (colour.id === colourId) {
        return { ...colour, orders: calculatedOrders };
      }
      return colour;
    }));

    setShowPercentageCalculator(null);
    setPercentageResult(null);
  };

  return (
    <div className="w-full max-w-[95vw] mx-auto p-2 bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Menu Bar */}
      <div className="bg-white rounded-lg shadow-lg p-2 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Order configurator</h1>
              <p className="text-slate-600 text-xs">MOQ: {moq.toLocaleString()}m per colour</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative menu-dropdown">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="px-3 py-1.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium text-sm flex items-center gap-1"
                title="Menu"
              >
                <Menu className="w-4 h-4" />
                Menu
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-30 min-w-[200px] menu-dropdown">
                  <button
                    onClick={() => {
                      setShowScenarioManager(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 flex items-center gap-2 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Create Scenario
                  </button>
                  <button
                    onClick={() => {
                      setShowLoadDropdown(!showLoadDropdown);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 flex items-center gap-2 text-sm"
                  >
                    <FolderOpen className="w-4 h-4" />
                    Load Scenario
                  </button>
                  <div className="border-t border-slate-200 my-1"></div>
                  <div className="px-4 py-2 text-xs text-slate-500">
                    {scenarios.length} scenario{scenarios.length !== 1 ? 's' : ''} saved
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearAllNumbers}
              className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm flex items-center gap-1"
              title="Clear all quantities"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
            <div className="relative scenario-dropdown">
              <button
                onClick={() => {
                  setShowScenarioInput(!showScenarioInput);
                  setShowLoadDropdown(false);
                }}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-1"
                title="Save current scenario"
              >
                <Save className="w-4 h-4" />
                Save Scenario
              </button>
              {showScenarioInput && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg p-2 z-20 min-w-[250px] scenario-dropdown">
                  <input
                    type="text"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    placeholder="Enter scenario name"
                    className="w-full px-2 py-1 border border-slate-300 rounded text-sm mb-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && saveScenario()}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveScenario}
                      className="flex-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setShowScenarioInput(false);
                        setScenarioName('');
                      }}
                      className="flex-1 px-2 py-1 bg-slate-300 text-slate-700 rounded text-xs hover:bg-slate-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {scenarios.length > 0 && (
              <div className="relative scenario-dropdown">
                <button
                  onClick={() => {
                    setShowLoadDropdown(!showLoadDropdown);
                    setShowScenarioInput(false);
                  }}
                  className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm flex items-center gap-1"
                  title="Load saved scenario"
                >
                  <FolderOpen className="w-4 h-4" />
                  Load Scenario
                </button>
                {showLoadDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-20 min-w-[250px] max-h-[300px] overflow-y-auto scenario-dropdown">
                    {scenarios.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-slate-500">No saved scenarios</div>
                    ) : (
                      scenarios.map((scenario) => (
                        <div
                          key={scenario.id}
                          onClick={() => {
                            loadScenario(scenario.id);
                            setShowLoadDropdown(false);
                          }}
                          className={`px-3 py-2 hover:bg-slate-100 cursor-pointer flex items-center justify-between ${
                            selectedScenario === scenario.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-800">{scenario.name}</div>
                            <div className="text-xs text-slate-500">
                              {new Date(scenario.savedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <button
                            onClick={(e) => deleteScenario(scenario.id, e)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                            title="Delete scenario"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
            <button
              onClick={addColour}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              + Add colour
            </button>
          </div>
        </div>

        {/* Colour Status Overview */}
        <div className="mb-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {colours.map((colour) => {
            const total = calculateColourTotal(colour);
            const meetsMOQ = total >= moq;
            const percentage = (total / moq) * 100;

            return (
              <div
                key={colour.id}
                className={`p-2 rounded-lg border-2 ${
                  meetsMOQ ? 'border-green-500 bg-green-50' : 'border-amber-500 bg-amber-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <input
                    type="text"
                    value={colour.name}
                    onChange={(e) => updateColourName(colour.id, e.target.value)}
                    className="px-1.5 py-0.5 border border-slate-300 rounded font-medium text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                  {colours.length > 1 && (
                    <button
                      onClick={() => removeColour(colour.id)}
                      className="ml-1 p-0.5 text-red-600 hover:bg-red-100 rounded transition-colors text-sm"
                      title="Remove colour"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                <div className="mb-1">
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        meetsMOQ ? 'bg-green-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, percentage)}%` }}
                    />
                  </div>
                </div>

                <div className="text-xs space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total:</span>
                    <span className="font-bold text-slate-800">{total.toFixed(0)}m</span>
                  </div>
                  {!meetsMOQ && (
                    <div className="text-amber-700 font-medium text-xs">
                      Need {(moq - total).toFixed(0)}m
                    </div>
                  )}
                  {meetsMOQ && (
                    <div className="flex items-center gap-0.5 text-green-700 font-medium text-xs">
                      <CheckCircle className="w-3 h-3" />
                      <span>MOQ met</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => optimizeComposition(colour.id)}
                    className="flex-1 px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-1"
                    title="Optimize composition to meet MOQ"
                  >
                    <Sparkles className="w-3 h-3" />
                    Optimize
                  </button>
                  <button
                    onClick={() => {
                      const currentTotal = calculateColourTotal(colour);
                      calculateFromPercentages(colour.id, currentTotal > 0 ? currentTotal : moq);
                    }}
                    className="flex-1 px-2 py-1 bg-teal-600 text-white rounded text-xs hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-1"
                    title="Calculate from percentages"
                  >
                    %
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optimization Modal */}
        {showOptimization && optimizationResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowOptimization(null)}>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    Optimize Composition: {optimizationResult.colourName}
                  </h2>
                  <button
                    onClick={() => setShowOptimization(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4 grid grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-3 rounded">
                    <div className="text-xs text-slate-600">Current Total</div>
                    <div className="text-lg font-bold text-slate-800">{optimizationResult.currentTotal.toFixed(1)}m</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="text-xs text-blue-600">Target (MOQ)</div>
                    <div className="text-lg font-bold text-blue-800">{optimizationResult.target.toFixed(0)}m</div>
                  </div>
                  <div className={`p-3 rounded ${optimizationResult.newTotal >= moq ? 'bg-green-50' : 'bg-amber-50'}`}>
                    <div className={`text-xs ${optimizationResult.newTotal >= moq ? 'text-green-600' : 'text-amber-600'}`}>New Total</div>
                    <div className={`text-lg font-bold ${optimizationResult.newTotal >= moq ? 'text-green-800' : 'text-amber-800'}`}>
                      {optimizationResult.newTotal.toFixed(1)}m
                    </div>
                  </div>
                </div>

                {optimizationResult.suggestions.length > 0 ? (
                  <>
                    <div className="mb-3">
                      <h3 className="font-semibold text-slate-800 mb-2">
                        {optimizationResult.difference > 0 ? 'Suggested Additions:' : 'Suggested Reductions:'}
                      </h3>
                      <div className="space-y-2">
                        {optimizationResult.suggestions.map((suggestion, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded border ${
                              suggestion.action === 'add' 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-red-50 border-red-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm text-slate-800">
                                  {suggestion.productName}
                                </div>
                                <div className="text-xs text-slate-600 mt-1">
                                  {suggestion.action === 'add' ? '+' : '-'}{suggestion.units} units 
                                  ({suggestion.currentQty} → {suggestion.newQty})
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-slate-800">
                                  {suggestion.action === 'add' ? '+' : '-'}{suggestion.totalFabric.toFixed(1)}m
                                </div>
                                <div className="text-xs text-slate-500">
                                  {suggestion.fabricPerUnit.toFixed(2)}m/unit
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={applyOptimization}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                      >
                        Apply Optimization
                      </button>
                      <button
                        onClick={() => setShowOptimization(null)}
                        className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-slate-600">
                      {optimizationResult.currentTotal >= moq 
                        ? 'This colour already meets the MOQ! No optimization needed.'
                        : 'No optimization suggestions available.'}
                    </p>
                    <button
                      onClick={() => setShowOptimization(null)}
                      className="mt-4 px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 font-medium"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Percentage Calculator Modal */}
        {showPercentageCalculator && percentageResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowPercentageCalculator(null)}>
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-2xl">%</span>
                    Calculate from Percentages: {percentageResult.colourName}
                  </h2>
                  <button
                    onClick={() => setShowPercentageCalculator(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4 bg-slate-50 p-3 rounded">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">Total Fabric (meters)</label>
                      <input
                        type="number"
                        value={percentageResult.totalFabricMeters}
                        onChange={(e) => {
                          const newTotal = parseFloat(e.target.value) || 0;
                          calculateFromPercentages(percentageResult.colourId, newTotal);
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="w-full">
                        <div className="text-xs text-slate-600">Calculated Total Fabric</div>
                        <div className="text-lg font-bold text-teal-800">{percentageResult.summary.totalCalculatedFabric.toFixed(1)}m</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-slate-600">Total Sets: </span>
                      <span className="font-bold">{percentageResult.summary.totalSets}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Total Individual Items: </span>
                      <span className="font-bold">{percentageResult.summary.totalIndividualItems}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Difference: </span>
                      <span className={`font-bold ${Math.abs(percentageResult.totalFabricMeters - percentageResult.summary.totalCalculatedFabric) < 1 ? 'text-green-600' : 'text-amber-600'}`}>
                        {(percentageResult.totalFabricMeters - percentageResult.summary.totalCalculatedFabric).toFixed(1)}m
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Bedding Sets Breakdown */}
                  {Object.keys(percentageResult.breakdown.sets).length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2 text-sm">Bedding Sets (Bundles)</h3>
                      <div className="space-y-1">
                        {Object.entries(percentageResult.breakdown.sets).map(([setId, data]) => {
                          const set = fabricProducts.find(p => p.id === setId);
                          return (
                            <div key={setId} className="p-2 bg-blue-50 rounded border border-blue-200 text-xs">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium">{set?.item} {set?.width}×{set?.length} + {set?.pillowSize}</span>
                                  <span className="text-slate-600 ml-2">({data.percentage}%)</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold">{data.quantity} sets</div>
                                  <div className="text-slate-600">{data.totalFabric.toFixed(1)}m</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Individual Items Breakdown */}
                  {Object.keys(percentageResult.breakdown.individualItems).length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2 text-sm">Individual Items (Production Quantities)</h3>
                      <div className="space-y-1 max-h-[300px] overflow-y-auto">
                        {Object.entries(percentageResult.breakdown.individualItems)
                          .sort(([a], [b]) => {
                            const productA = fabricProducts.find(p => p.id === a);
                            const productB = fabricProducts.find(p => p.id === b);
                            if (productA?.type !== productB?.type) {
                              const order = { 'cover': 1, 'pillowcase': 2, 'sheet': 3 };
                              return (order[productA?.type] || 0) - (order[productB?.type] || 0);
                            }
                            return a.localeCompare(b);
                          })
                          .map(([itemId, data]) => {
                            const product = fabricProducts.find(p => p.id === itemId);
                            return (
                              <div key={itemId} className={`p-2 rounded border text-xs ${
                                product?.type === 'cover' ? 'bg-green-50 border-green-200' :
                                product?.type === 'pillowcase' ? 'bg-purple-50 border-purple-200' :
                                'bg-amber-50 border-amber-200'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <span className="font-medium">{product?.item} {product?.width}×{product?.length}</span>
                                    {data.percentage !== null && (
                                      <span className="text-slate-600 ml-2">({data.percentage}%)</span>
                                    )}
                                    {data.fromSets !== undefined && data.fromSets > 0 && (
                                      <div className="text-xs text-slate-500 mt-0.5">
                                        {data.fromSets} from sets, {data.individual || 0} individual
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold">{data.quantity} units</div>
                                    <div className="text-slate-600">{data.totalFabric.toFixed(1)}m</div>
                                    <div className="text-xs text-slate-500">{data.fabricPerUnit.toFixed(2)}m/unit</div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={applyPercentageCalculation}
                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium"
                  >
                    Apply Calculation
                  </button>
                  <button
                    onClick={() => setShowPercentageCalculator(null)}
                    className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="overflow-x-auto" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20">
              <tr className="bg-slate-800 text-white">
                <th className="px-2 py-1.5 text-left sticky left-0 bg-slate-800 z-30 min-w-[160px] text-xs font-semibold">Product</th>
                <th className="px-2 py-1.5 text-left text-xs font-semibold min-w-[90px]">SKU</th>
                <th className="px-2 py-1.5 text-left text-xs font-semibold min-w-[110px]">Details</th>
                <th className="px-2 py-1.5 text-right text-xs font-semibold min-w-[90px]">Fabric/unit</th>
                {colours.map((colour) => (
                  <th key={colour.id} className="px-2 py-1.5 text-center min-w-[130px] text-xs font-semibold">
                    {colour.name}
                  </th>
                ))}
                <th className="px-2 py-1.5 text-right bg-slate-700 text-xs font-semibold min-w-[90px]">Total units</th>
                <th className="px-2 py-1.5 text-right bg-slate-700 text-xs font-semibold min-w-[90px]">Total fabric</th>
              </tr>
            </thead>
            <tbody>
              {/* Group Sets with their Components */}
              {fabricProducts.filter(p => p.category === 'sets').map((setProduct, setIdx) => {
                const totalSetUnits = colours.reduce((sum, colour) => sum + (colour.orders[setProduct.id] || 0), 0);
                const pillowText = setProduct.pillowCount > 1 ? `${setProduct.pillowCount}x ` : '1x ';
                const setDetails = `${setProduct.width}×${setProduct.length} + ${pillowText}${setProduct.pillowSize}`;
                
                // Get components for this set
                const duvetCover = fabricProducts.find(p => p.id === setProduct.components[0]);
                const pillowcases = setProduct.components.slice(1).map(id => fabricProducts.find(p => p.id === id));

                return (
                  <React.Fragment key={setProduct.id}>
                    {/* Set Row */}
                    <tr className="bg-blue-50 border-b border-blue-200">
                      <td className="px-2 py-1 font-semibold text-blue-900 sticky left-0 z-10 text-xs border-r border-blue-200" style={{ backgroundColor: '#dbeafe' }}>
                        📦 {setProduct.item}
                      </td>
                      <td className="px-2 py-1 text-blue-700 text-xs font-mono">
                        {setProduct.sku}
                      </td>
                      <td className="px-2 py-1 text-blue-700 text-xs font-medium">
                        {setDetails}
                      </td>
                      <td className="px-2 py-1 text-right text-blue-600 italic text-xs">
                        Packing Set
                      </td>
                      {colours.map((colour) => {
                        const qty = colour.orders[setProduct.id] || 0;
                        return (
                          <td key={colour.id} className="px-2 py-1 bg-blue-50">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => updateQuantity(colour.id, setProduct.id, -10)}
                                className="p-0.5 rounded bg-blue-200 hover:bg-blue-300 transition-colors text-xs"
                                disabled={qty === 0}
                              >
                                -10
                              </button>
                              <button
                                onClick={() => updateQuantity(colour.id, setProduct.id, -1)}
                                className="p-0.5 rounded bg-blue-200 hover:bg-blue-300 transition-colors"
                                disabled={qty === 0}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              
                              <input
                                type="number"
                                min="0"
                                value={qty || ''}
                                placeholder="0"
                                onChange={(e) => setQuantity(colour.id, setProduct.id, e.target.value)}
                                className="w-12 px-1 py-0.5 text-center border border-blue-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              />
                              
                              <button
                                onClick={() => updateQuantity(colour.id, setProduct.id, 1)}
                                className="p-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => updateQuantity(colour.id, setProduct.id, 10)}
                                className="p-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xs"
                              >
                                +10
                              </button>
                            </div>
                            {qty > 0 && (
                              <div className="text-xs text-center text-blue-700 mt-0.5 font-medium">
                                {qty} sets
                              </div>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-2 py-1 text-right font-mono font-semibold text-blue-900 bg-blue-100 text-xs">
                        {totalSetUnits > 0 ? totalSetUnits.toLocaleString() : '—'}
                      </td>
                      <td className="px-2 py-1 text-right font-mono text-blue-600 bg-blue-100 italic text-xs">
                        —
                      </td>
                    </tr>

                    {/* Duvet Cover Component */}
                    {duvetCover && (() => {
                      const fabricPerUnit = calculateFabric(duvetCover.width, duvetCover.length, duvetCover.type, duvetCover.pillowSize, duvetCover.pillowCount);
                      const totalUnits = colours.reduce((sum, colour) => sum + (colour.orders[duvetCover.id] || 0), 0);
                      const totalFabric = totalUnits * fabricPerUnit;
                      
                      return (
                        <tr key={duvetCover.id} className="bg-green-50 hover:bg-green-100 transition-colors border-l-2 border-green-400">
                          <td className="px-2 py-1 pl-4 font-medium text-slate-700 sticky left-0 z-10 text-xs" style={{ backgroundColor: '#f0fdf4' }}>
                            └─ {duvetCover.item}
                          </td>
                          <td className="px-2 py-1 text-slate-600 text-xs font-mono">
                            {duvetCover.sku}
                          </td>
                          <td className="px-2 py-1 text-slate-700 text-xs font-medium">
                            {duvetCover.width}×{duvetCover.length}
                          </td>
                          <td className="px-2 py-1 text-right text-slate-700 text-xs font-mono">
                            {fabricPerUnit.toFixed(2)}m
                          </td>
                          {colours.map((colour) => {
                            const qty = colour.orders[duvetCover.id] || 0;
                            const subtotal = fabricPerUnit * qty;
                            return (
                              <td key={colour.id} className="px-2 py-1 bg-green-50">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => updateQuantity(colour.id, duvetCover.id, -10)}
                                    className="p-0.5 rounded bg-slate-200 hover:bg-slate-300 transition-colors text-xs"
                                    disabled={qty === 0}
                                  >
                                    -10
                                  </button>
                                  <button
                                    onClick={() => updateQuantity(colour.id, duvetCover.id, -1)}
                                    className="p-0.5 rounded bg-slate-200 hover:bg-slate-300 transition-colors"
                                    disabled={qty === 0}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  
                                  <input
                                    type="number"
                                    min="0"
                                    value={qty || ''}
                                    placeholder="0"
                                    onChange={(e) => setQuantity(colour.id, duvetCover.id, e.target.value)}
                                    className="w-12 px-1 py-0.5 text-center border border-slate-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                  />
                                  
                                  <button
                                    onClick={() => updateQuantity(colour.id, duvetCover.id, 1)}
                                    className="p-0.5 rounded bg-green-600 hover:bg-green-700 text-white transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => updateQuantity(colour.id, duvetCover.id, 10)}
                                    className="p-0.5 rounded bg-green-600 hover:bg-green-700 text-white transition-colors text-xs"
                                  >
                                    +10
                                  </button>
                                </div>
                                {qty > 0 && (
                                  <div className="text-xs text-center text-slate-700 mt-0.5 font-mono">
                                    {subtotal.toFixed(1)}m
                                  </div>
                                )}
                              </td>
                            );
                          })}
                          <td className="px-2 py-1 text-right font-mono font-semibold text-slate-700 bg-green-100 text-xs">
                            {totalUnits > 0 ? totalUnits.toLocaleString() : '—'}
                          </td>
                          <td className="px-2 py-1 text-right font-mono font-semibold text-green-700 bg-green-100 text-xs">
                            {totalFabric > 0 ? `${totalFabric.toFixed(1)}m` : '—'}
                          </td>
                        </tr>
                      );
                    })()}

                    {/* Pillowcase Components */}
                    {pillowcases.map((pillowcase) => {
                      if (!pillowcase) return null;
                      const fabricPerUnit = calculateFabric(pillowcase.width, pillowcase.length, pillowcase.type, pillowcase.pillowSize, pillowcase.pillowCount);
                      const totalUnits = colours.reduce((sum, colour) => sum + (colour.orders[pillowcase.id] || 0), 0);
                      const totalFabric = totalUnits * fabricPerUnit;
                      
                      return (
                        <tr key={pillowcase.id} className="bg-purple-50 hover:bg-purple-100 transition-colors border-l-2 border-purple-400">
                          <td className="px-2 py-1 pl-4 font-medium text-slate-700 sticky left-0 z-10 text-xs" style={{ backgroundColor: '#faf5ff' }}>
                            └─ {pillowcase.item}
                          </td>
                          <td className="px-2 py-1 text-slate-600 text-xs font-mono">
                            {pillowcase.sku}
                          </td>
                          <td className="px-2 py-1 text-slate-700 text-xs font-medium">
                            {pillowcase.width}×{pillowcase.length}
                          </td>
                          <td className="px-2 py-1 text-right text-slate-700 text-xs font-mono">
                            {fabricPerUnit.toFixed(2)}m
                          </td>
                          {colours.map((colour) => {
                            const qty = colour.orders[pillowcase.id] || 0;
                            const subtotal = fabricPerUnit * qty;
                            return (
                              <td key={colour.id} className="px-2 py-1 bg-purple-50">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => updateQuantity(colour.id, pillowcase.id, -10)}
                                    className="p-0.5 rounded bg-slate-200 hover:bg-slate-300 transition-colors text-xs"
                                    disabled={qty === 0}
                                  >
                                    -10
                                  </button>
                                  <button
                                    onClick={() => updateQuantity(colour.id, pillowcase.id, -1)}
                                    className="p-0.5 rounded bg-slate-200 hover:bg-slate-300 transition-colors"
                                    disabled={qty === 0}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  
                                  <input
                                    type="number"
                                    min="0"
                                    value={qty || ''}
                                    placeholder="0"
                                    onChange={(e) => setQuantity(colour.id, pillowcase.id, e.target.value)}
                                    className="w-12 px-1 py-0.5 text-center border border-slate-300 rounded text-xs focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                  />
                                  
                                  <button
                                    onClick={() => updateQuantity(colour.id, pillowcase.id, 1)}
                                    className="p-0.5 rounded bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => updateQuantity(colour.id, pillowcase.id, 10)}
                                    className="p-0.5 rounded bg-purple-600 hover:bg-purple-700 text-white transition-colors text-xs"
                                  >
                                    +10
                                  </button>
                                </div>
                                {qty > 0 && (
                                  <div className="text-xs text-center text-slate-700 mt-0.5 font-mono">
                                    {subtotal.toFixed(1)}m
                                  </div>
                                )}
                              </td>
                            );
                          })}
                          <td className="px-2 py-1 text-right font-mono font-semibold text-slate-700 bg-purple-100 text-xs">
                            {totalUnits > 0 ? totalUnits.toLocaleString() : '—'}
                          </td>
                          <td className="px-2 py-1 text-right font-mono font-semibold text-purple-700 bg-purple-100 text-xs">
                            {totalFabric > 0 ? `${totalFabric.toFixed(1)}m` : '—'}
                          </td>
                        </tr>
                      );
                    })}

                    {/* Spacer row between sets */}
                    {setIdx < fabricProducts.filter(p => p.category === 'sets').length - 1 && (
                      <tr>
                        <td colSpan={5 + colours.length + 2} className="px-2 py-0.5 bg-slate-100"></td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Standalone Individual Items Section */}
              <tr className="bg-amber-100">
                <td colSpan={5 + colours.length + 2} className="px-2 py-1 font-bold text-amber-900 text-xs border-t-2 border-amber-400">
                  FITTED SHEETS (Individual Items - Not in Sets)
                </td>
              </tr>
              {fabricProducts.filter(p => p.type === 'sheet').map((product, idx) => {
                const fabricPerUnit = calculateFabric(product.width, product.length, product.type, product.pillowSize, product.pillowCount);
                const totalUnits = colours.reduce((sum, colour) => sum + (colour.orders[product.id] || 0), 0);
                const totalFabric = totalUnits * fabricPerUnit;
                const bgColor = idx % 2 === 0 ? 'bg-white' : 'bg-slate-50';

                return (
                  <tr key={product.id} className={`${bgColor} hover:bg-amber-50 transition-colors`}>
                    <td className="px-2 py-1 font-medium text-slate-700 sticky left-0 z-10 text-xs" style={{ backgroundColor: 'inherit' }}>
                      {product.item}
                    </td>
                    <td className="px-2 py-1 text-slate-600 text-xs font-mono">
                      {product.sku}
                    </td>
                    <td className="px-2 py-1 text-slate-700 text-xs font-medium">
                      {product.width}×{product.length}
                    </td>
                    <td className="px-2 py-1 text-right text-slate-700 text-xs font-mono">
                      {fabricPerUnit.toFixed(2)}m
                    </td>
                    {colours.map((colour) => {
                      const qty = colour.orders[product.id] || 0;
                      const subtotal = fabricPerUnit * qty;

                      return (
                        <td key={colour.id} className="px-2 py-1">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => updateQuantity(colour.id, product.id, -10)}
                              className="p-0.5 rounded bg-slate-200 hover:bg-slate-300 transition-colors text-xs"
                              disabled={qty === 0}
                            >
                              -10
                            </button>
                            <button
                              onClick={() => updateQuantity(colour.id, product.id, -1)}
                              className="p-0.5 rounded bg-slate-200 hover:bg-slate-300 transition-colors"
                              disabled={qty === 0}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            
                            <input
                              type="number"
                              min="0"
                              value={qty || ''}
                              placeholder="0"
                              onChange={(e) => setQuantity(colour.id, product.id, e.target.value)}
                              className="w-12 px-1 py-0.5 text-center border border-slate-300 rounded text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                            />
                            
                            <button
                              onClick={() => updateQuantity(colour.id, product.id, 1)}
                              className="p-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => updateQuantity(colour.id, product.id, 10)}
                              className="p-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white transition-colors text-xs"
                            >
                              +10
                            </button>
                          </div>
                          {qty > 0 && (
                            <div className="text-xs text-center text-slate-700 mt-0.5 font-mono">
                              {subtotal.toFixed(1)}m
                            </div>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-2 py-1 text-right font-mono font-semibold text-slate-700 bg-slate-100 text-xs">
                      {totalUnits > 0 ? totalUnits.toLocaleString() : '—'}
                    </td>
                    <td className="px-2 py-1 text-right font-mono font-semibold text-amber-700 bg-slate-100 text-xs">
                      {totalFabric > 0 ? `${totalFabric.toFixed(1)}m` : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="sticky bottom-0">
              <tr className="bg-slate-800 text-white font-bold">
                <td colSpan="4" className="px-2 py-1.5 text-right text-xs sticky left-0 bg-slate-800 z-30">Total per colour (production fabric):</td>
                {colours.map((colour) => {
                  const total = calculateColourTotal(colour);
                  return (
                    <td key={colour.id} className="px-2 py-1.5 text-center font-mono text-xs">
                      {total.toFixed(1)}m
                    </td>
                  );
                })}
                <td className="px-2 py-1.5 text-right bg-slate-700 text-xs">
                  {colours.reduce((sum, colour) => {
                    // Count only individual items (sets are just for tracking)
                    return sum + Object.entries(colour.orders).reduce((s, [pid, qty]) => {
                      const product = fabricProducts.find(p => p.id === pid);
                      return product && product.category === 'individual' ? s + qty : s;
                    }, 0);
                  }, 0).toLocaleString()}
                </td>
                <td className="px-2 py-1.5 text-right bg-slate-700 font-mono text-xs">
                  {colours.reduce((sum, c) => sum + calculateColourTotal(c), 0).toFixed(1)}m
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-2 p-2 bg-slate-100 rounded-lg">
          <h3 className="font-bold text-slate-800 mb-1 text-sm">Order summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div>
              <div className="text-xs text-slate-600">Total colours</div>
              <div className="text-lg font-bold text-slate-800">{colours.length}</div>
            </div>
            <div>
              <div className="text-xs text-slate-600">Colours meeting MOQ</div>
              <div className="text-lg font-bold text-green-600">
                {colours.filter(c => calculateColourTotal(c) >= moq).length} / {colours.length}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600">Total products</div>
              <div className="text-lg font-bold text-slate-800">
                {colours.reduce((sum, colour) => {
                  return sum + Object.entries(colour.orders).reduce((s, [pid, qty]) => s + qty, 0);
                }, 0).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600">Total fabric needed</div>
              <div className="text-lg font-bold text-blue-600">
                {colours.reduce((sum, c) => sum + calculateColourTotal(c), 0).toFixed(1)}m
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Manager Modal */}
      {showScenarioManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowScenarioManager(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Save className="w-5 h-5 text-green-600" />
                  Scenario Manager
                </h2>
                <button
                  onClick={() => setShowScenarioManager(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {/* Create New Scenario */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-slate-800 mb-3">Create New Scenario</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newScenarioName}
                    onChange={(e) => setNewScenarioName(e.target.value)}
                    placeholder="Enter scenario name..."
                    className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && saveScenario(newScenarioName)}
                  />
                  <button
                    onClick={() => saveScenario(newScenarioName)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium text-sm"
                  >
                    Save Scenario
                  </button>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Current order will be saved as a new scenario
                </p>
              </div>

              {/* Saved Scenarios */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Saved Scenarios ({scenarios.length})</h3>
                {scenarios.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <FolderOpen className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                    <p>No scenarios saved yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {scenarios.map((scenario) => {
                      const scenarioTotal = scenario.colours.reduce((sum, c) => {
                        return sum + Object.entries(c.orders).reduce((s, [pid, qty]) => {
                          const product = fabricProducts.find(p => p.id === pid);
                          if (product && product.category === 'individual') {
                            const fabricPerUnit = calculateFabric(product.width, product.length, product.type, product.pillowSize, product.pillowCount);
                            return s + (fabricPerUnit * qty);
                          }
                          return s;
                        }, 0);
                      }, 0);

                      return (
                        <div
                          key={scenario.id}
                          className={`p-3 rounded-lg border-2 ${
                            selectedScenario === scenario.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-slate-800">{scenario.name}</h4>
                                {selectedScenario === scenario.id && (
                                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">Loaded</span>
                                )}
                              </div>
                              <div className="text-xs text-slate-600 mt-1">
                                Saved: {new Date(scenario.savedAt).toLocaleString()}
                              </div>
                              <div className="text-xs text-slate-600 mt-1">
                                {scenario.colours.length} colour{scenario.colours.length !== 1 ? 's' : ''} • 
                                Total fabric: <span className="font-semibold">{scenarioTotal.toFixed(1)}m</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  loadScenario(scenario.id);
                                  setShowScenarioManager(false);
                                }}
                                className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                              >
                                Load
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteScenario(scenario.id, e);
                                }}
                                className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                                title="Delete scenario"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

