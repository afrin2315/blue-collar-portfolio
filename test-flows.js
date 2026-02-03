const API_URL = 'http://localhost:5001/api/questions';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function getQuestions(answers) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers)
  });
  return response.json();
}

async function testScenario(name, answers, expectedQuestions, unexpectedQuestions) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(`TEST: ${name}`, 'cyan');
  log('='.repeat(60), 'cyan');
  
  try {
    const result = await getQuestions(answers);
    const questionIds = result.questions.map(q => q.id);
    
    log(`\nAnswers provided:`, 'blue');
    Object.entries(answers).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    
    log(`\nQuestions returned (${questionIds.length}):`, 'blue');
    questionIds.forEach((id, index) => {
      console.log(`  ${index + 1}. ${id}`);
    });
    
    let passed = true;
    
    // Check expected questions
    log(`\nChecking EXPECTED questions:`, 'blue');
    expectedQuestions.forEach(expected => {
      if (questionIds.includes(expected)) {
        log(`  ✅ ${expected} - PRESENT`, 'green');
      } else {
        log(`  ❌ ${expected} - MISSING`, 'red');
        passed = false;
      }
    });
    
    // Check unexpected questions
    log(`\nChecking UNEXPECTED questions (should NOT appear):`, 'blue');
    unexpectedQuestions.forEach(unexpected => {
      if (questionIds.includes(unexpected)) {
        log(`  ❌ ${unexpected} - INCORRECTLY PRESENT`, 'red');
        passed = false;
      } else {
        log(`  ✅ ${unexpected} - CORRECTLY ABSENT`, 'green');
      }
    });
    
    if (passed) {
      log(`\n✅ TEST PASSED`, 'green');
    } else {
      log(`\n❌ TEST FAILED`, 'red');
    }
    
    return passed;
    
  } catch (error) {
    log(`\n❌ ERROR: ${error.message}`, 'red');
    return false;
  }
}

async function runAllTests() {
  log('\n' + '█'.repeat(60), 'cyan');
  log('BLUE COLLAR PORTFOLIO - COMPREHENSIVE FLOW TESTING', 'cyan');
  log('█'.repeat(60) + '\n', 'cyan');
  
  const results = [];
  
  // TEST 1: Plumber with YES to relocation
  results.push(await testScenario(
    'Plumber + YES to relocation → Should show family & accommodation',
    {
      name: 'Test User',
      age: '30',
      mobile: '9876543210',
      city: 'Mumbai',
      languages: 'Hindi, English',
      job_role: 'Plumber',
      has_own_tools: 'Yes',
      can_bring_tools: 'Yes',
      experience_years: '5-10 years',
      job_description: 'Plumbing work',
      main_responsibilities: 'Fixing pipes',
      work_location_type: 'Both',
      can_work_independently: 'Yes',
      plumbing_work_type: 'Pipes and Fittings',
      plumbing_tools: 'Wrench, Pliers',
      pipes_experience: 'PVC, Copper',
      independent_work_plumbing: 'Yes',
      emergency_handling_plumbing: 'Yes',
      has_work_photos: 'No',
      has_work_videos: 'No',
      ready_to_relocate: 'Yes'
    },
    ['bring_family', 'need_accommodation', 'payment_preference'], // Should show these
    [] // No unexpected questions
  ));
  
  // TEST 2: Plumber with NO to relocation
  results.push(await testScenario(
    'Plumber + NO to relocation → Should skip family & accommodation',
    {
      name: 'Test User',
      age: '30',
      mobile: '9876543210',
      city: 'Mumbai',
      languages: 'Hindi, English',
      job_role: 'Plumber',
      has_own_tools: 'Yes',
      can_bring_tools: 'Yes',
      experience_years: '5-10 years',
      job_description: 'Plumbing work',
      main_responsibilities: 'Fixing pipes',
      work_location_type: 'Both',
      can_work_independently: 'Yes',
      plumbing_work_type: 'Pipes and Fittings',
      plumbing_tools: 'Wrench, Pliers',
      pipes_experience: 'PVC, Copper',
      independent_work_plumbing: 'Yes',
      emergency_handling_plumbing: 'Yes',
      has_work_photos: 'No',
      has_work_videos: 'No',
      ready_to_relocate: 'No'
    },
    ['payment_preference'], // Should show payment
    ['bring_family', 'need_accommodation'] // Should NOT show these
  ));
  
  // TEST 3: Electrician with YES to own tools
  results.push(await testScenario(
    'Electrician + YES to own tools → Should show "can bring tools"',
    {
      name: 'Test User',
      age: '28',
      mobile: '9876543210',
      city: 'Delhi',
      languages: 'Hindi, English',
      job_role: 'Electrician',
      has_own_tools: 'Yes'
    },
    ['can_bring_tools'], // Should show
    ['need_tools_provision'] // Should NOT show
  ));
  
  // TEST 4: Electrician with NO to own tools
  results.push(await testScenario(
    'Electrician + NO to own tools → Should show "need tools from employer"',
    {
      name: 'Test User',
      age: '28',
      mobile: '9876543210',
      city: 'Delhi',
      languages: 'Hindi, English',
      job_role: 'Electrician',
      has_own_tools: 'No'
    },
    ['need_tools_from_employer'], // Should show (correct ID)
    ['can_bring_tools'] // Should NOT show
  ));
  
  // TEST 5: Driver - should SKIP tools questions
  results.push(await testScenario(
    'Driver → Should skip ALL tools questions',
    {
      name: 'Test User',
      age: '32',
      mobile: '9876543210',
      city: 'Bangalore',
      languages: 'Kannada, English',
      job_role: 'Driver'
    },
    ['experience_years'], // Should go straight to experience
    ['has_own_tools', 'can_bring_tools', 'need_tools_from_employer'] // Should NOT show any tools questions
  ));
  
  // TEST 6: Security Guard - should SKIP tools questions
  results.push(await testScenario(
    'Security Guard → Should skip ALL tools questions',
    {
      name: 'Test User',
      age: '35',
      mobile: '9876543210',
      city: 'Chennai',
      languages: 'Tamil, English',
      job_role: 'Security Guard'
    },
    ['experience_years'], // Should go straight to experience
    ['has_own_tools', 'can_bring_tools', 'need_tools_from_employer'] // Should NOT show any tools questions
  ));
  
  // TEST 7: Delivery Executive - should SKIP tools questions
  results.push(await testScenario(
    'Delivery Executive → Should skip ALL tools questions',
    {
      name: 'Test User',
      age: '25',
      mobile: '9876543210',
      city: 'Pune',
      languages: 'Marathi, English',
      job_role: 'Delivery Executive'
    },
    ['experience_years'], // Should go straight to experience
    ['has_own_tools', 'can_bring_tools', 'need_tools_from_employer'] // Should NOT show any tools questions
  ));
  
  // TEST 8: Helper/Other - should show generic questions
  results.push(await testScenario(
    'Helper / Other → Should show generic questions',
    {
      name: 'Test User',
      age: '27',
      mobile: '9876543210',
      city: 'Kolkata',
      languages: 'Bengali, English',
      job_role: 'Helper',
      has_own_tools: 'No',
      need_tools_provision: 'Yes',
      experience_years: '1-2 years',
      job_description: 'General help',
      main_responsibilities: 'Various tasks',
      work_location_type: 'On-Site',
      can_work_independently: 'No'
    },
    ['skills_free', 'tools_equipment_free', 'typical_workday'], // Should show generic questions
    ['plumbing_work_type', 'electric_work_type', 'has_license'] // Should NOT show occupation-specific
  ));
  
  // TEST 9: Complete flow - all answers
  results.push(await testScenario(
    'Complete Carpenter flow → Should show confirmation',
    {
      name: 'Test User',
      age: '30',
      mobile: '9876543210',
      city: 'Hyderabad',
      languages: 'Telugu, English',
      job_role: 'Carpenter',
      has_own_tools: 'Yes',
      can_bring_tools: 'Yes',
      experience_years: '5-10 years',
      job_description: 'Carpentry work',
      main_responsibilities: 'Making furniture',
      work_location_type: 'Both',
      can_work_independently: 'Yes',
      carpentry_work_type: 'Furniture Making',
      carpentry_tools: 'Saw, Hammer',
      wood_types_experience: 'Teak, Pine',
      has_work_photos: 'Yes',
      has_work_videos: 'No',
      ready_to_relocate: 'Yes',
      bring_family: 'Yes',
      need_accommodation: 'Yes',
      payment_preference: 'Weekly'
    },
    ['confirm_details', 'final_submission'], // Should show confirmation questions
    ['name', 'age', 'mobile'] // Should NOT show already answered questions
  ));
  
  // SUMMARY
  log('\n' + '█'.repeat(60), 'cyan');
  log('TEST SUMMARY', 'cyan');
  log('█'.repeat(60), 'cyan');
  
  const passed = results.filter(r => r).length;
  const failed = results.filter(r => !r).length;
  
  log(`\nTotal Tests: ${results.length}`, 'blue');
  log(`Passed: ${passed}`, 'green');
  log(`Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  
  if (failed === 0) {
    log('\n🎉 ALL TESTS PASSED! 🎉\n', 'green');
  } else {
    log(`\n⚠️  ${failed} TEST(S) FAILED ⚠️\n`, 'red');
  }
}

// Run tests
runAllTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
