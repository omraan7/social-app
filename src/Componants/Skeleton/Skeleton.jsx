import { Card, Skeleton } from '@heroui/react'

export default function Skeletonn({ page }) {

  if (page == 1) {
    return <Card className="max-w-200 overflow-hidden mx-auto my-3.5  mt-2.5  min-h-62" radius="lg">
      <Skeleton className="rounded-lg my-2.5">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg my-2.5">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg my-2.5">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg my-2.5">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>

  }

  if (page == 5) {
    return <Card className="max-w-75  p-5 overflow-hidden mx-auto my-3.5   min-h-62" radius="lg">
      <Skeleton className="rounded-lg my-2.5">
        <div className="h-5 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg my-2.5">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="rounded-lg my-2.5">
          <div className="h-5 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg my-2.5">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="rounded-lg my-2.5">
          <div className="h-5 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg my-2.5">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg my-2.5">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="rounded-lg my-2.5">
          <div className="h-5 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg my-2.5">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="rounded-lg my-2.5">
          <div className="h-5 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg my-2.5">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>

  }


  if (page == 4) {
    return <Card className="max-w-5xl   mt-6  rounded-xl overflow-hidden mx-auto     min-h-96" radius="lg">
      <Skeleton className="rounded-lg my-2.5  ">
        <div className="h-24 rounded-lg " />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg my-2.5  ">
          <div className="h-3 w-3/5 rounded-lg " />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg my-2.5  ">
          <div className="h-3 w-4/5 rounded-lg " />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg my-2.5  ">
          <div className="h-3 w-2/5 rounded-lg " />
        </Skeleton>
      </div>
    </Card>

  } if (page == 3) {
    return <Card className="max-w-96 overflow-hidden mx-auto my-3.5   min-h-20" radius="lg">

      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg my-2.5">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg my-2.5">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg my-2.5">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>

  }


  return (
    <>
      {page == 2 ? <Card className="max-w-96  overflow-hidden mx-auto    min-h-62" radius="lg">
        <Skeleton className="rounded-lg my-2.5">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg my-2.5">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg my-2.5">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg my-2.5">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card> : ""}
    </>
  )
}
