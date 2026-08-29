# Learning Module Content Template

This file demonstrates how to easily inject content into the learning module framework.

## Module Structure

Each module follows this pattern:

```typescript
// In the module page (e.g., intro-to-ai/page.tsx)
const sections: Section[] = [
  {
    id: "section-id",
    title: "Section Title",
    type: "content" | "flipcards" | "quiz" | "reflection",
    content?: React.ReactNode,  // For content and reflection types
    flipCards?: FlipCardData[]  // For flipcards type
  }
]
```

## Content Types

### 1. Content Sections
For explanatory content, use the `content` type:

```typescript
{
  id: "introduction",
  title: "What is AI?",
  type: "content",
  content: (
    <div className="space-y-6">
      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed">
          Your content here...
        </p>
      </div>
      
      {/* Optional: Key insight box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Brain className="h-8 w-8 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Key Insight</h3>
              <p className="text-sm">Your insight here...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

### 2. Flip Card Sections
For interactive learning with flip cards:

```typescript
{
  id: "definitions",
  title: "Key Terms",
  type: "flipcards",
  flipCards: [
    {
      type: "definition",
      data: {
        term: "Term Name",
        definition: "Definition text"
      }
    },
    {
      type: "question",
      data: {
        question: "Question text?",
        answer: "Answer text"
      }
    },
    {
      type: "concept",
      data: {
        concept: "Concept Name",
        explanation: "Explanation text",
        example: "Optional example" // optional
      }
    }
  ]
}
```

### 3. Reflection Sections
For summarizing learning and next steps:

```typescript
{
  id: "reflection",
  title: "What You've Learned",
  type: "reflection",
  content: (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            What You've Learned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Learning point 1</span>
            </li>
            {/* Add more learning points */}
          </ul>
        </CardContent>
      </Card>

      {/* Next module link */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Ready for the Next Module?</h3>
          <p className="mb-4">Description of next module...</p>
          <Link href="/student/learning/ai-fundamentals/next-module">
            <Button className="w-full" size="lg">
              Continue to "Next Module"
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
```

## How to Add New Content

### Step 1: Create New Module Directory
```bash
mkdir -p app/student/learning/ai-fundamentals/your-module-name
```

### Step 2: Copy Template
Copy the `intro-to-ai/page.tsx` file as a starting point:
```bash
cp app/student/learning/ai-fundamentals/intro-to-ai/page.tsx app/student/learning/ai-fundamentals/your-module-name/page.tsx
```

### Step 3: Update Module Metadata
Change the module header information:
```typescript
// Update these values
<CardTitle className="text-2xl">Your Module Title</CardTitle>
<CardDescription className="text-base">
  Your module description
</CardDescription>

// Update duration and section count
<Clock className="h-4 w-4" />
30 min

<BookOpen className="h-4 w-4" />
5 sections
```

### Step 4: Replace Content Array
Replace the `sections` array with your content:

```typescript
const sections: Section[] = [
  // Your content sections here
]
```

### Step 5: Update Navigation
Update the main learning page (`/student/learning/page.tsx`) to include your new module in the course structure.

## Content Guidelines

### Writing Style
- Use clear, simple language appropriate for students
- Break complex concepts into digestible chunks
- Include real-world examples and analogies
- Keep paragraphs short and scannable

### Interactive Elements
- Use flip cards for key terms and concepts
- Include reflection questions to reinforce learning
- Add visual elements (icons, colored cards) to enhance engagement
- Provide clear next steps and module connections

### Accessibility
- Use semantic HTML structure
- Include proper headings hierarchy
- Ensure color contrast meets accessibility standards
- Provide alt text for any images

## Example Content Snippets

### Timeline Content
```typescript
<div className="border-l-4 border-primary pl-4">
  <h3 className="font-semibold text-lg">Time Period</h3>
  <p className="text-muted-foreground">
    Description of what happened during this time period.
  </p>
</div>
```

### Highlighted Information
```typescript
<Card className="bg-yellow-50 border-yellow-200">
  <CardContent className="p-6">
    <div className="flex items-start gap-4">
      <AlertTriangle className="h-8 w-8 text-yellow-600 mt-1" />
      <div>
        <h3 className="font-semibold text-lg mb-2">Important Note</h3>
        <p className="text-sm">Your important information here...</p>
      </div>
    </div>
  </CardContent>
</Card>
```

### Lists with Visual Bullets
```typescript
<ul className="space-y-2">
  <li className="flex items-start gap-2">
    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
    <span>List item text</span>
  </li>
</ul>
```

This framework makes it easy to inject new content by simply updating the sections array with your educational content! 