# Setting up Spring Cloud Eureka Client Dependency in Maven Project

This guide explains how to properly add the **Spring Cloud Netflix Eureka Client** dependency in a Maven Spring Boot project and avoid versioning errors by using the Spring Cloud BOM (Bill of Materials).

---

## Problem

When adding the `spring-cloud-starter-netflix-eureka-client` dependency directly in your `pom.xml`, you might encounter the following error during build:

```
'dependencies.dependency.version' for org.springframework.cloud:spring-cloud-starter-netflix-eureka-client:jar is missing.
```

This happens because the Spring Cloud dependencies require managed versions which must be imported via the BOM.

---

## Solution

### Step 1: Add Spring Cloud Version Property

In your `pom.xml`, define the Spring Cloud version in the `<properties>` section:

```
<properties>
    <java.version>17</java.version>
    <spring-cloud.version>2025.0.0</spring-cloud.version>
</properties>
```

*Note:* Adjust the Spring Cloud version (`2025.0.0` here) according to your Spring Boot compatibility.

---

### Step 2: Import Spring Cloud BOM using Dependency Management

Add the Spring Cloud BOM in the `<dependencyManagement>` section BEFORE your `<dependencies>`:

```
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

---

### Step 3: Add Eureka Client Dependency WITHOUT Version

Inside the `<dependencies>` section, add:

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

---

### Step 4: Reload Maven Project and Build
---

## Additional Tips

- Always ensure compatibility between your Spring Boot and Spring Cloud versions.
- The BOM simplifies version management by defining compatible versions for related dependencies in one place.

---

## Example: Relevant `pom.xml` Sections

```
<properties>
    <java.version>17</java.version>
    <spring-cloud.version>2025.0.0</spring-cloud.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
    <!-- Other dependencies -->
</dependencies>
```

