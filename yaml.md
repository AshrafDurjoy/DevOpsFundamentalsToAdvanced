# Complete YAML Syntax Guide

## 1. Basic YAML Syntax

### Theory Foundation

YAML (YAML Ain't Markup Language) is a human-readable data serialization format. It's designed to be:

- Easy to read by humans
- Easy to map to common data types in programming languages
- Compatible with modern programming practices
- Supports unicode and other portable data formats

### 1.1 Scalars (Simple Values)

#### Theory

Scalars are the simplest forms of data in YAML. They represent single values like strings, numbers, or booleans.

- Strings can be unquoted, single-quoted, or double-quoted
- Numbers support integer, float, and scientific notation
- Booleans support multiple representations (true/false, yes/no, on/off)
- Null values can be represented as `null`, `~`, or empty

```yaml
# String Theory:
# - Unquoted: Simple alphanumeric strings
# - Double-quoted: Supports escaping characters
# - Single-quoted: Treats backslashes as literal
plain_string: Hello World # Unquoted
quoted_string: "Hello\nWorld" # Supports escape sequences
single_quoted: 'Hello\nWorld' # Literal backslash

# Number Theory:
# - Integers: Simple whole numbers
# - Floats: Decimal numbers
# - Scientific: Exponential notation
integer: 42 # Simple integer
float: 3.14159 # Decimal number
scientific: 1.23e-4 # Scientific notation

# Boolean Theory:
# - Multiple representations for true/false
# - Case-insensitive
boolean_true: true # Standard boolean
boolean_false: false
also_true: yes # Alternative representation
also_false: no

# Null Theory:
# - Multiple representations for null
# - Used to explicitly indicate no value
null_value: null # Standard null
also_null: ~ # Alternative representation
```

### 1.2 Collections

#### Theory: Collections

YAML supports two main collection types:

1. Sequences (Lists/Arrays): Ordered collections of values
2. Mappings (Dictionaries): Key-value pair collections

##### Sequence Theory

- Can be block style (using dashes) or inline style
- Supports nested sequences
- Maintains order of elements
- Can mix different data types

```yaml
# Block sequence
fruits:
  - apple # Each dash indicates a list item
  - banana # Indentation is significant
  - orange # Order is preserved

# Inline sequence
numbers: [1, 2, 3, 4, 5] # Compact representation

# Nested sequences
matrix:
  - [1, 2, 3] # Each element is itself a sequence
  - [4, 5, 6]
  - [7, 8, 9]
```

##### Mapping Theory

- Key-value pairs can be nested to any depth
- Keys must be unique within a mapping
- Values can be of any type
- Can use block or inline style

```yaml
# Block mapping with explanation
person:
  name: John Doe # Simple string value
  age: 30 # Number value
  address: # Nested mapping
    street: Main St
    city: Boston

# Inline mapping theory
coordinates: { x: 10, y: 20 } # Compact form for simple mappings
```

## 2. Advanced Features

### 2.1 Multi-line Strings

#### Theory

YAML provides several ways to handle multi-line strings:

- Literal Block Style (|): Preserves newlines
- Folded Block Style (>): Converts newlines to spaces
- Strip (-) or Keep (+) modifiers control final line breaks

```yaml
# Literal Block Theory (|)
# - Preserves all newlines
# - Indentation is stripped
description: |
  Line 1 will be exactly as written
  Line 2 will start on a new line
  Line 3 will also be on its own line

# Folded Block Theory (>)
# - Converts newlines to spaces
# - Preserves blank lines as paragraph breaks
message: >
  This long message
  will be folded into
  a single line.

# Chomping Modifiers Theory
# + keeps all newlines
# - strips all newlines
# (no modifier) keeps one newline
```

### 2.2 Anchors and Aliases

#### Theory

Anchors (&) and Aliases (\*) provide a way to:

- Reuse content in multiple places
- Create references to complex structures
- Merge mappings using << operator

```yaml
# Anchor Theory
# & defines an anchor
# * references an anchor
# << merges mappings

base: &base_settings
  timeout: 30
  retries: 3

# Merge Theory
development:
  <<: *base_settings # Merges base_settings here
  mode: development # Adds new field

production:
  <<: *base_settings # Reuses same settings
  mode: production # Different mode
```

### 2.3 Complex Mapping Keys

```yaml
# Complex key example
? - key1
  - key2
: value

# Multiple word keys
"multiple word key": value
"another key with spaces": value

# Nested complex keys
? !pair
  - job: developer
  - level: senior
: salary: 100000
```

## 3. YAML Tags and Types

### 3.1 Explicit Types

```yaml
# String
string_value: !!str "42"

# Integer
integer_value: !!int 42

# Float
float_value: !!float 42.0

# Boolean
boolean_value: !!bool true

# Null
null_value: !!null null

# Set
!!set
  ? item1
  ? item2
  ? item3
```

### 3.2 Custom Tags

```yaml
# Define timestamp
date: !datetime 2023-01-01

# Custom object
!person
name: John Doe
age: 30
```

## 4. Best Practices

1. Indentation:
   - Use consistent indentation (2 or 4 spaces)
   - Don't use tabs
2. Quotes:
   - Use quotes for strings containing special characters
   - Use quotes when strings start with symbols
3. Comments:
   - Use comments to explain complex structures
   - Keep comments clear and concise

## 5. Validation

Always validate your YAML using:

- Online YAML validators
- yamllint command line tool
- IDE extensions

## 6. Practice Exercise

Create a YAML file that includes:

1. A complex nested structure
2. Multiple data types
3. Anchors and aliases
4. Multi-line strings
5. At least one custom tag

Example solution:

```yaml
# Configuration for a web application
version: 2.0

# Default configurations
defaults: &default_config
  timeout: 30
  retries: 3
  logging: true

# Environment configurations
environments:
  development:
    <<: *default_config
    database:
      host: localhost
      ports: [5432, 6379]
      credentials: &dev_creds
        username: dev_user
        password: dev_pass

  staging:
    <<: *default_config
    database:
      host: staging-db
      ports: [5432, 6379]
      credentials: *dev_creds

  production:
    <<: *default_config
    database:
      host: prod-db
      ports: [5432, 6379]
      credentials: !secure-creds
        username: !env PROD_USER
        password: !env PROD_PASS

# Application features
features:
  api:
    enabled: true
    description: |
      REST API with following features:
      - Authentication
      - Rate limiting
      - CORS support
    rate_limit: 100

  admin_panel:
    enabled: false
    access_levels: !!set
      ? admin
      ? superuser
      ? moderator
```
