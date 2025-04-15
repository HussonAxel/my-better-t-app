import { useMatches } from "@tanstack/react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { type RouteStaticData } from "@/types/route"

export function DynamicBreadcrumb() {
  const matches = useMatches()
  
  const isHomePage = matches[1]?.pathname === '/'
  const breadcrumbs = isHomePage 
    ? matches.slice(1)
    : [
        { pathname: '/', staticData: { title: 'Home' } },
        ...matches.slice(1)
      ]

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className="capitalize">
        {breadcrumbs.map((match, index) => {
          const isLast = index === breadcrumbs.length - 1
          const path = match.pathname
          const title = (match.staticData as RouteStaticData)?.title || path.split('/').pop() || 'Home'

          return (
            <BreadcrumbItem key={path}>
              {isLast ? (
                <BreadcrumbPage>{title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={path}>{title}</BreadcrumbLink>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
} 